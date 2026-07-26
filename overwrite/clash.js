// 国内DNS服务器
const domesticNameservers = [
  "https://763721-l015uk8svazghoed.alidns.com/dns-query",
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://doh.opendns.com/dns-query",
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  "ipv6": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    // 个人
    "+.edisk.top",
    "+.cloudflare.com",
    "+.sourceforge.net",
    "+.quickconnect.cn"
  ],
  "default-nameserver": ["223.5.5.5", "208.67.222.222", "119.29.29.29", "8.8.4.4"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
// 规则集通用配置
// https://wiki.metacubex.one/config/rule-providers/#path
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400,
  "proxy": "节点选择"
};

// 规则集配置
// 规则：https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash
//      https://github.com/Accademia/Additional_Rule_For_Clash/tree/main
//      https://github.com/Loyalsoldier/clash-rules
//      https://github.com/chmhlive/clash_rule/tree/main/rules
//
//      https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/
//      https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/
//      GEOSITE, china-list cn geolocation-!cn gfw win-update tld-cn
//      GEOIP,private cloudflare cloudfront google telegram tor telegram CN

// 图标：https://github.com/lobehub/lobe-icons
//      https://github.com/lobehub/lobe-icons/tree/master/packages/static-png/dark
//
//      https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/xai.png 
//

const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://anti-ad.net/clash.yaml",
    "path": "./ruleset/anti-ad/reject.yaml"
  },
  "githubsrv": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/GitHub/GitHub.yaml",
    "path": "./ruleset/chmhlive/githubsrv.yaml"
  }, 
  "facebook_meta": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Facebook/Facebook.yaml",
    "path": "./ruleset/chmhlive/facebook_meta.yaml"
  },   
  "chat_copilot": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Copilot/Copilot.yaml",
    "path": "./ruleset/chmhlive/chat_copilot.yaml"
  }, 
  "microsoftbing": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Bing/Bing.yaml",
    "path": "./ruleset/chmhlive/microsoftbing.yaml"
  },   
  "microsoftedge": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/MicrosoftEdge/MicrosoftEdge.yaml",
    "path": "./ruleset/chmhlive/microsoftedge.yaml"
  },    
  "onedrive": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/OneDrive/OneDrive.yaml",
    "path": "./ruleset/chmhlive/onedrive.yaml"
  },        
  "microsoftapp": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/chmhlive/clash_rule/main/rules/MicrosoftAPPs/MicrosoftAPPs_Domain.yaml",
    "path": "./ruleset/chmhlive/MicrosoftAPPs_Domain.yaml"
  },  
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/iCloud/iCloud.yaml",
    "path": "./ruleset/chmhlive/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Apple/Apple_Domain.yaml",
    "path": "./ruleset/chmhlive/apple.yaml"
  },
  "claude": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Claude/Claude.yaml",
    "path": "./ruleset/chmhlive/claude.yaml"
  },
  "gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Gemini/Gemini.yaml",
    "path": "./ruleset/chmhlive/gemini.yaml"
  },  
  "google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Google/Google.yaml",
    "path": "./ruleset/chmhlive/google.yaml"
  },
  "youtube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/YouTube/YouTube.yaml",
    "path": "./ruleset/chmhlive/youtube.yaml"
  },  
  "cGrok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/cGrok/cGrok.yaml",
    "path": "./ruleset/chmhlive/cgrok.yaml"
  },
  "prevent_dns_leak": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "format": "yaml",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/prevent_dns_leak/prevent_dns_leak.yaml",
    "path": "./ruleset/chmhlive/prevent_dns_leak.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/OpenAI/OpenAI.yaml",
    "path": "./ruleset/chmhlive/openai.yaml"
  },
  "cloudflare": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/Cloudflare/Cloudflare.yaml",
    "path": "./ruleset/chmhlive/cloudflare.yaml"
  },
  "cai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/cAI/cAI.yaml",
    "path": "./ruleset/chmhlive/cai.yaml"
  },
  "cdirect": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/cDirect/cDirect.yaml",
    "path": "./ruleset/chmhlive/cdirect.yaml"
  },
  "cproxy": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://cdn.jsdelivr.net/gh/chmhlive/clash_rule@main/rules/cProxy/cProxy.yaml",
    "path": "./ruleset/chmhlive/cproxy.yaml"
  }    
};
// 规则 
const rules = [  
  // 规则集
  "RULE-SET,cai,AI_API",  
  "RULE-SET,cdirect,全局直连", 
  "RULE-SET,cproxy,节点选择",     
  "RULE-SET,prevent_dns_leak,DNS定位",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,githubsrv,GitHubSrv",
  "RULE-SET,chat_copilot,微软Copilot",
  "RULE-SET,microsoftbing,微软Bing",
  "RULE-SET,microsoftedge,微软Edge",
  "RULE-SET,onedrive,微软OneDrive",
  "RULE-SET,microsoftapp,微软服务",
  "RULE-SET,openai,ChatGPT",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,cloudflare,Cloudflare",  
  "RULE-SET,claude,ClaudeAI",  
  "RULE-SET,gemini,谷歌服务",
  "RULE-SET,youtube,谷歌媒体", 
  "RULE-SET,google,谷歌服务",
  "RULE-SET,facebook_meta,Meta",
  "RULE-SET,cGrok,xAIGrok",
  "GEOSITE,telegram,电报消息",   
  "GEOSITE,private,全局直连",
  "GEOSITE,cn,全局直连",
  "GEOSITE,gfw,节点选择",
  //"GEOSITE,geolocation-!cn,节点选择",
  
  // ===== IP 规则（兜底）=====
  "GEOIP,telegram,电报消息,no-resolve",
  "GEOIP,google,谷歌服务,no-resolve",
  "GEOIP,private,全局直连,no-resolve",
  "GEOIP,LAN,全局直连,no-resolve", // 局域网 IP 及保留 IP 地址列表
  
  // 可选：仅作为裸 IP 的最后兜底
  "GEOIP,CN,全局直连,no-resolve", // 中国大陆 IP 地址列表
  
  // ===== 默认规则=====
  "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;

  // 覆盖原配置中的代理组
  // icon: https://github.com/lobehub/lobe-icons?tab=readme-ov-file
  //       https://github.com/lobehub/lobe-icons/tree/master/packages/static-svg/icons
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      "name": "GitHubSrv",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/github.png"
    },
    {
      ...groupBaseOption,
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "filter": "US|🇺🇸|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|United States",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    }, 
    {
      ...groupBaseOption,
      "name": "谷歌媒体",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },    
    {
      ...groupBaseOption,
      "name": "ClaudeAI",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
    },     
    {
      ...groupBaseOption,
      "name": "ChatGPT",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
      "url": "https://chatgpt.com",
      "expected-status": "200", 
    }, 
    {
      ...groupBaseOption,
      "name": "xAIGrok",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/xai.png"
    }, 
    {
      ...groupBaseOption,
      "name": "Meta",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/meta-color.png"
    },                  
    {
      ...groupBaseOption,
      "name": "微软Copilot",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/copilot-color.png"
    }, 
    {
      ...groupBaseOption,
      "name": "微软Bing",
      "type": "select",
      "proxies": ["AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bing.svg"
    },    
    {
      ...groupBaseOption,
      "name": "微软Edge",
      "type": "select",
      "proxies": ["AI_API", "全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },       
    {
      ...groupBaseOption,
      "name": "微软OneDrive",
      "type": "select",
      "proxies": ["全局直连", "AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/onedrive.svg"
    },  
    {
      ...groupBaseOption,
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连", "AI_API", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },      
    {
      ...groupBaseOption,
      "name": "Cloudflare",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
      "include-all": true,
      "icon": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/cloudflare-color.png"
    },    
    {
      ...groupBaseOption,
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },    
    {
      ...groupBaseOption,
      "name": "AI_API",
      "type": "select",
      "include-all": true,
      //"filter": "AD|🇦🇩|AE|🇦🇪|AF|🇦🇫|AG|🇦🇬|AL|🇦🇱|AM|🇦🇲|AO|🇦🇴|AR|🇦🇷|AT|🇦🇹|AU|🇦🇺|AZ|🇦🇿|BA|🇧🇦|BB|🇧🇧|BD|🇧🇩|BE|🇧🇪|BF|🇧🇫|BG|🇧🇬|BH|🇧🇭|BI|🇧🇮|BJ|🇧🇯|BN|🇧🇳|BO|🇧🇴|BR|🇧🇷|BS|🇧🇸|BT|🇧🇹|BW|🇧🇼|BZ|🇧🇿|CA|🇨🇦|CD|🇨🇩|CF|🇨🇫|CG|🇨🇬|CH|🇨🇭|CI|🇨🇮|CL|🇨🇱|CM|🇨🇲|CO|🇨🇴|CR|🇨🇷|CV|🇨🇻|CY|🇨🇾|CZ|🇨🇿|DE|🇩🇪|DJ|🇩🇯|DK|🇩🇰|DM|🇩🇲|DO|🇩🇴|DZ|🇩🇿|EC|🇪🇨|EE|🇪🇪|EG|🇪🇬|ER|🇪🇷|ES|🇪🇸|ET|🇪🇹|FI|🇫🇮|FJ|🇫🇯|FM|🇫🇲|FR|🇫🇷|GA|🇬🇦|GB|🇬🇧|GD|🇬🇩|GE|🇬🇪|GH|🇬🇭|GM|🇬🇲|GN|🇬🇳|GQ|🇬🇶|GR|🇬🇷|GT|🇬🇹|GW|🇬🇼|GY|🇬🇾|HN|🇭🇳|HR|🇭🇷|HT|🇭🇹|HU|🇭🇺|ID|🇮🇩|IE|🇮🇪|IL|🇮🇱|IN|🇮🇳|IQ|🇮🇶|IS|🇮🇸|IT|🇮🇹|JM|🇯🇲|JO|🇯🇴|JP|🇯🇵|KE|🇰🇪|KG|🇰🇬|KH|🇰🇭|KI|🇰🇮|KM|🇰🇲|KN|🇰🇳|KR|🇰🇷|KW|🇰🇼|KZ|🇰🇿|LA|🇱🇦|LB|🇱🇧|LC|🇱🇨|LI|🇱🇮|LK|🇱🇰|LR|🇱🇷|LS|🇱🇸|LT|🇱🇹|LU|🇱🇺|LV|🇱🇻|LY|🇱🇾|MA|🇲🇦|MC|🇲🇨|MD|🇲🇩|ME|🇲🇪|MG|🇲🇬|MH|🇲🇭|MK|🇲🇰|ML|🇲🇱|MM|🇲🇲|MN|🇲🇳|MR|🇲🇷|MT|🇲🇹|MU|🇲🇺|MV|🇲🇻|MW|🇲🇼|MX|🇲🇽|MY|🇲🇾|MZ|🇲🇿|NA|🇳🇦|NE|🇳🇪|NG|🇳🇬|NI|🇳🇮|NL|🇳🇱|NO|🇳🇴|NP|🇳🇵|NR|🇳🇷|NZ|🇳🇿|OM|🇴🇲|PA|🇵🇦|PE|🇵🇪|PG|🇵🇬|PH|🇵🇭|PK|🇵🇰|PL|🇵🇱|PS|🇵🇸|PT|🇵🇹|PW|🇵🇼|PY|🇵🇾|QA|🇶🇦|RO|🇷🇴|RS|🇷🇸|RW|🇷🇼|SA|🇸🇦|SB|🇸🇧|SC|🇸🇨|SD|🇸🇩|SE|🇸🇪|SG|🇸🇬|SI|🇸🇮|SK|🇸🇰|SL|🇸🇱|SM|🇸🇲|SN|🇸🇳|SO|🇸🇴|SR|🇸🇷|SS|🇸🇸|ST|🇸🇹|SV|🇸🇻|SZ|🇸🇿|TD|🇹🇩|TG|🇹🇬|TH|🇹🇭|TJ|🇹🇯|TL|🇹🇱|TM|🇹🇲|TN|🇹🇳|TO|🇹🇴|TR|🇹🇷|TT|🇹🇹|TV|🇹🇻|TW|🇹🇼|TZ|🇹🇿|UA|🇺🇦|UG|🇺🇬|US|🇺🇸|UY|🇺🇾|UZ|🇺🇿|VA|🇻🇦|VC|🇻🇨|VN|🇻🇳|VU|🇻🇺|WS|🇼🇸|YE|🇾🇪|ZA|🇿🇦|ZM|🇿🇲|ZW|🇿🇼|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|Japan|新加坡|坡|狮城|SG|Singapore|KR|Korea|KOR|首尔|韩|韓|台|新北|彰化|Taiwan|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|United States|澳大利亚|德国",
      "filter": "JP|🇯🇵|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|Japan|US|🇺🇸|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|United States|MY",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/android.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },    
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "DNS定位",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "AI_API"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/assemblyai-color.svg"
    },    
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // 返回修改后的配置
  return config;
}