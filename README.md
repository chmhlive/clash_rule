# 🛡️ Clash Rule (个人精选与合并分流规则库)

本项目是一个自动化的 Clash / Stash 规则整合仓库，旨在将上游三大规则源进行优先级合并，输出最优化、低内存占用的 Clash 分流规则。

---

## 🏗️ 规则合并架构与优先级

生成的 `rules/` 目录中的规则按照以下 **优先级由高到低** 进行合并与覆盖：

1. **最高优先级 (Level 3)**: `custom/` 目录
   * 存放你个人自定义/修改的规则文件（优先追加或直接独立生成）。
2. **中等优先级 (Level 2)**: [`Accademia/Additional_Rule_For_Clash`](https://github.com/Accademia/Additional_Rule_For_Clash)
   * 提供精修与补充规则（如 AppleAI, Grok, Gemini 以及剔除冗余后的 China 规则）。若与底层同名，直接进行**同名目录级彻底清空与替换**。
3. **基础优先级 (Level 1)**: [`blackmatrix7/ios_rule_script`](https://github.com/blackmatrix7/ios_rule_script)
   * 提供海量通用的全量 Clash 规则基础层。

---

## 🌐 1. 分发地址构造规则 (URL Standard)

订阅 URL 由 **基础域名前缀** + **仓库名与分支** + **相对文件路径** 拼接而成：

* **jsDelivr CDN 全球免费加速订阅（推荐）**：
  `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/<目录/文件名>`
* **GitHub Raw 直连订阅**：
  `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/<目录/文件名>`

---

## 📝 2. 常见规则分发对照表 (Examples)

| 分流规则功能 | 规则类型 (Behavior) | jsDelivr CDN 订阅地址（推荐） | GitHub Raw 直连订阅地址 |
| :--- | :--- | :--- | :--- |
| **中国域名 (China)** | `domain` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/China/China_Domain.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/China/China_Domain.yaml` |
| **中国全量 (ChinaMax)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/ChinaMax/ChinaMax.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/ChinaMax/ChinaMax.yaml` |
| **苹果智能 (AppleAI)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/AppleAI/AppleAI.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/AppleAI/AppleAI.yaml` |
| **xAI Grok** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Grok/Grok.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Grok/Grok.yaml` |
| **Google Gemini** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Gemini/Gemini.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Gemini/Gemini.yaml` |
| **自定义直连 (Direct)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Direct.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Direct.yaml` |
| **自定义代理 (Proxy)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Proxy.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Proxy.yaml` |

---

## 🔗 Clash / Stash 配置文件接入示例

在你的 Clash / Stash 配置文件中，可以按照如下示范进行引用：

### 示例 A：使用 jsDelivr CDN 全球加速订阅（推荐）

```yaml
rule-providers:
  # 示例 1: 引用精修版的中国域名分流规则 (jsDelivr CDN)
  China:
    type: http
    behavior: domain
    url: "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/China/China_Domain.yaml"
    path: ./rules/China.yaml
    interval: 86400

  # 示例 2: 引用 AppleAI 分流规则 (jsDelivr CDN)
  AppleAI:
    type: http
    behavior: classical
    url: "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/AppleAI/AppleAI.yaml"
    path: ./rules/AppleAI.yaml
    interval: 86400
```

### 示例 B：使用 GitHub Raw 直连订阅

```yaml
rule-providers:
  China:
    type: http
    behavior: domain
    url: "https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/China/China_Domain.yaml"
    path: ./rules/China.yaml
    interval: 86400

  AppleAI:
    type: http
    behavior: classical
    url: "https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/AppleAI/AppleAI.yaml"
    path: ./rules/AppleAI.yaml
    interval: 86400
```

---

## ⏰ 更新频率与手动触发更新

* **每周定时自动同步**：每周一 00:00 UTC（北京时间每周一 08:00），GitHub Actions 会自动触发 Python 脚本，拉取上游最新规则并合并发布。
* **手动立即触发更新**：若上游有紧急更新或你刚刚修改提交了 `custom/` 规则，访问 [GitHub Actions 页面](https://github.com/chmhlive/clash_rule/actions)，点击 **`Weekly Clash Rule Merge Sync`** -> **`Run workflow`** 即可立即启动构建与 CDN 全量 Purge。

---

## 📁 目录结构

```text
clash_rule/
├── custom/                 # 个人自定义规则（改动这里并提交即可）
│   ├── README.md
│   ├── Direct.yaml
│   └── Proxy.yaml
├── scripts/
│   └── merge_rules.py      # 自动拉取与合并处理脚本
├── .github/
│   workflows/
│       sync.yml            # 每周自动构建工作流与全量 CDN Purge
├── rules/                  # 自动生成的最终规则集合（客户端订阅此处）
└── README.md               # 本说明文档
```
