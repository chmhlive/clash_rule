#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Clash 规则定时合并脚本 (merge_rules.py)
逻辑：
1. git clone --depth 1 拉取 blackmatrix7/ios_rule_script 的 rule/Clash 规则（基础层）
2. git clone --depth 1 拉取 Accademia/Additional_Rule_For_Clash 规则（精修/补充层，同名文件级覆盖）
3. 读取 custom/ 目录下的自定义规则（个人自定义层，最高优先级）
4. 输出最终整合好的规则到 rules/ 目录
"""

import os
import shutil
import subprocess

# 基础目录配置
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CUSTOM_DIR = os.path.join(BASE_DIR, "custom")
RULES_DIR = os.path.join(BASE_DIR, "rules")
TEMP_DIR = os.path.join(BASE_DIR, "temp_repos")

# 源仓库 URL
BLACKMATRIX7_URL = "https://github.com/blackmatrix7/ios_rule_script.git"
ACCADEMIA_URL = "https://github.com/Accademia/Additional_Rule_For_Clash.git"

def clean_dir(directory):
    """清空或创建目录"""
    if os.path.exists(directory):
        shutil.rmtree(directory, ignore_errors=True)
    os.makedirs(directory, exist_ok=True)

def run_git_clone(repo_url, target_dir):
    """使用 git clone --depth 1 快速克隆仓库"""
    clean_dir(target_dir)
    cmd = ["git", "clone", "--depth", "1", repo_url, target_dir]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except subprocess.CalledProcessError as e:
        print(f"[Error] Failed to clone {repo_url}: {e}")
        return False

def copy_files_recursive(src_dir, dst_dir, is_accademia=False):
    """递归复制文件，同名覆盖（过滤 .git 及隐藏目录，支持 README.md 合并）"""
    count = 0
    for root, dirs, files in os.walk(src_dir):
        # 排除 .git 和隐藏目录
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.startswith(".") or file == "LICENSE":
                continue
            src_file = os.path.join(root, file)
            rel_path = os.path.relpath(src_file, src_dir)
            dst_file = os.path.join(dst_dir, rel_path)
            
            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            
            # 特殊处理根目录的 README.md (如果是 Accademia 并且目标 rules/README.md 已存在，则进行底部追加合并)
            if is_accademia and rel_path == "README.md" and os.path.exists(dst_file):
                print("---> 合并 Accademia 根目录 README.md 至 rules/README.md 底部")
                with open(src_file, 'r', encoding='utf-8') as sf, open(dst_file, 'a', encoding='utf-8') as df:
                    df.write("\n\n---\n# 🔴 🟡 🟢 Accademia / Additional_Rule_For_Clash 补充规则说明\n\n")
                    df.write(sf.read())
            else:
                shutil.copy2(src_file, dst_file)
            count += 1
    return count

def process_blackmatrix7():
    """克隆并处理 blackmatrix7 的 Clash 规则 (基础层)"""
    print("===> 1. 正在拉取 blackmatrix7/ios_rule_script 规则 (基础层)...")
    bm_dir = os.path.join(TEMP_DIR, "blackmatrix7")
    if run_git_clone(BLACKMATRIX7_URL, bm_dir):
        clash_src = os.path.join(bm_dir, "rule", "Clash")
        if os.path.exists(clash_src):
            count = copy_files_recursive(clash_src, RULES_DIR)
            print(f"===> blackmatrix7 完成，共处理 {count} 个文件。")
        else:
            print("[Warning] blackmatrix7/rule/Clash 目录不存在")

def process_accademia():
    """克隆并覆盖 Accademia 的规则 (精修/补充层，同名文件级覆盖)"""
    print("===> 2. 正在拉取 Accademia/Additional_Rule_For_Clash 规则 (精修/补充层)...")
    ac_dir = os.path.join(TEMP_DIR, "accademia")
    if run_git_clone(ACCADEMIA_URL, ac_dir):
        count = copy_files_recursive(ac_dir, RULES_DIR, is_accademia=True)
        print(f"===> Accademia 完成，共覆盖/新增 {count} 个文件。")

def process_custom():
    """处理个人自定义规则 (最高优先级)"""
    print("===> 3. 正在叠加 custom/ 个人自定义规则...")
    if not os.path.exists(CUSTOM_DIR):
        print("===> custom 目录不存在，跳过。")
        return

    count = 0
    for root, _, files in os.walk(CUSTOM_DIR):
        for file in files:
            if file == "README.md" or file.startswith("."):
                continue
            
            src_path = os.path.join(root, file)
            rel_path = os.path.relpath(src_path, CUSTOM_DIR)
            dest_path = os.path.join(RULES_DIR, rel_path)
            
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            
            # 如果目标已存在同名规则，在文件头部追加自定义规则
            if os.path.exists(dest_path):
                print(f"---> 追加自定义内容到现有规则: {rel_path}")
                with open(src_path, 'r', encoding='utf-8') as sf, open(dest_path, 'r+', encoding='utf-8') as df:
                    custom_content = sf.read()
                    original_content = df.read()
                    df.seek(0, 0)
                    df.write(f"# --- Custom Rules Start ---\n{custom_content}\n# --- Custom Rules End ---\n\n" + original_content)
            else:
                print(f"---> 新增个人独立规则: {rel_path}")
                shutil.copy2(src_path, dest_path)
            count += 1
    print(f"===> 个人自定义规则处理完成，共处理 {count} 个文件。")

def main():
    print("=== 开始运行 Clash 规则合并逻辑 ===")
    os.makedirs(RULES_DIR, exist_ok=True)
    
    try:
        process_blackmatrix7()
        process_accademia()
        process_custom()
    finally:
        # 清理临时仓库目录
        if os.path.exists(TEMP_DIR):
            shutil.rmtree(TEMP_DIR, ignore_errors=True)
            
    print("=== Clash 规则合并完成！所有规则文件已输出至 rules/ 目录 ===")

if __name__ == "__main__":
    main()

