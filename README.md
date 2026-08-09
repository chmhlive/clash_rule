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
| **Cloudflare CDN (自定义)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/cCloudflare/cCloudflare.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/cCloudflare/cCloudflare.yaml` |
| **自定义直连 (Direct)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Direct.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Direct.yaml` |
| **自定义代理 (Proxy)** | `classical` | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Proxy.yaml` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/Proxy.yaml` |

---

## 🎨 3. 图标资源分发与使用说明 (Icons)

本仓库在 `icons/` 目录下托管常用策略组与 DNS 图标，可供 Mihomo / ClashParty / Clash Verge 等客户端直接引用。

### 📌 图标分发构造规则

* **jsDelivr CDN 全球免费加速（推荐）**：
  `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/<文件名>`
* **GitHub Raw 直连**：
  `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/<文件名>`

### 📋 内置图标对照表

| 图标用途 | 文件名 | 格式 | jsDelivr CDN 加速地址（推荐） | GitHub Raw 直连地址 |
| :--- | :--- | :--- | :--- | :--- |
| **DNS定位 / 检测** | `dns.png` | PNG | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/dns.png` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/dns.png` |
| **DNS定位 / 检测 (矢量)** | `dns.svg` | SVG | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/dns.svg` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/dns.svg` |
| **DNS定位 / 检测 (彩色)** | `dns-color.png` | PNG | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/dns-color.png` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/dns-color.png` |
| **全局 / 网络** | `global.png` | PNG | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/global.png` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/global.png` |
| **全局 / 网络 (矢量)** | `global.svg` | SVG | `https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/global.svg` | `https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/global.svg` |

### 🛠️ 客户端策略组 `icon` 配置范例

在 Mihomo Party 覆写脚本（`clash.js`）或策略组配置中，若需替换原有第三方链接，请参考以下范例：

```javascript
// ❌ 替换前（使用外部第三方文档站点图标）:
{
  "name": "DNS定位",
  "type": "select",
  "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
  "include-all": true,
  "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/assemblyai-color.svg"
}

// ✅ 替换后 - 推荐方式：使用本仓库 jsDelivr CDN 全球加速:
{
  "name": "DNS定位",
  "type": "select",
  "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
  "include-all": true,
  "icon": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/icons/dns.png"
}

// 🌐 替换后 - 备用方式：使用 GitHub Raw 直连:
{
  "name": "DNS定位",
  "type": "select",
  "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
  "include-all": true,
  "icon": "https://raw.githubusercontent.com/chmhlive/clash_rule/main/icons/dns.png"
}
```

---

## 🔗 4. Clash / Stash 配置文件接入示例

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

## ⏰ 5. 更新频率与手动触发更新

* **每周定时自动同步**：每周一 00:00 UTC（北京时间每周一 08:00），GitHub Actions 会自动触发 Python 脚本，拉取上游最新规则并合并发布。
* **手动立即触发更新**：若上游有紧急更新或你刚刚修改提交了 `custom/` 规则，访问 [GitHub Actions 页面](https://github.com/chmhlive/clash_rule/actions)，点击 **`Weekly Clash Rule Merge Sync`** -> **`Run workflow`** 即可立即启动构建与 CDN 全量 Purge。

---

## 📁 6. 目录结构

```text
clash_rule/
├── icons/                  # 策略组/节点通用图标资源（CDN 加速分发）
├── custom/                 # 个人自定义规则（改动这里并提交即可）
│   ├── README.md
│   ├── Direct.yaml
│   └── Proxy.yaml
├── scripts/
│   └── merge_rules.py      # 自动拉取与合并处理脚本
├── overwrite/
│   └── clash.js            # ClashParty（Mihomo Party）覆写配置
├── .github/
│   workflows/
│       sync.yml            # 每周自动构建工作流与全量 CDN Purge
├── rules/                  # 自动生成的最终规则集合（客户端订阅此处）
└── README.md               # 本说明文档
```

