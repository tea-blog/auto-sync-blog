// import * as fs from "fs"
import configurations from "../../../configurations.js"
import vitePressConfig from "../../template/vitepress/vitepress.config.js"
import mdTemplate, { actionTemplate, featureTemplate } from "../../template/vitepress/vitepress.index.md.js"
import { JUEJIN_USER_URL } from "../../website/juejin.js"
import { replaceKeywords } from "../../utils/template-process.js"
import { writeFileSync } from "fs"
import { CONFIG_FILE_PATH, DOCS_FILE_PATH } from "../../../build/config.base.js"
import { mkDir } from "../../utils/file-process.js"

const NAV_LINKS = {
  overview: {
    text: "总览",
    link: "/sort/all",
  },
  annual: {
    text: "年度",
    items: [],
  },
  column: {
    text: "专栏",
    link: "/categories/专栏/",
  },
  follow: {
    text: "关注",
    link: "",
  },
}

const processNavBar = (usedNav = [], userId, annualList) => {
  const nav = []
  for (const usedNavElement of usedNav) {
    const navLink = NAV_LINKS[usedNavElement]
    if (usedNavElement === "annual") {
      navLink.items = annualList
    } else if (usedNavElement === "follow") {
      navLink.link = `${JUEJIN_USER_URL}${userId}`
    }
    nav.push(navLink)
  }
  return nav
}

const processSocialLinks = (press) => {
  const socialLinks = press.socialLinks
  const usedSocial = Object.keys(socialLinks)
  return usedSocial.map((key) => ({
    icon: key,
    link: socialLinks[key],
  }))
}

const processPressHead = (blog) => {
  const STATIC_HEAD = [
    ["link", { rel: "icon", href: blog.logo }],
    ["meta", { name: "description", content: blog.description }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: blog.title }],
    ["meta", { property: "og:author", content: blog.author }],
    ["meta", { property: "og:site_name", content: blog.siteName }],
  ]

  const head = [...STATIC_HEAD]

  if (blog.head && blog.head.length) {
    head.push(...blog.head)
  }
  if (blog.keywords && blog.keywords.length) {
    head.push(["meta", { property: "keywords", content: blog.keywords.join(",") }])
  }

  return head
}

export const processVitePressConfig = async (annualList) => {
  const { press, blog, juejin } = configurations

  const replacer = (key) => {
    if (key === "nav") {
      return JSON.stringify(processNavBar(press.nav, juejin.userId, annualList))
    } else if (key === "socialLinks") {
      return JSON.stringify(processSocialLinks(press))
    } else if (key === "head") {
      return JSON.stringify(processPressHead(blog))
    } else {
      return blog[key] || press[key] || key
    }
  }

  const config = replaceKeywords(vitePressConfig, replacer)

  await mkDir(CONFIG_FILE_PATH)

  // 重写该文档（appendFile 是追加并不存在就直接创建）
  writeFileSync(`${CONFIG_FILE_PATH}/index.js`, config, (err) => {
    if (err) throw err
    console.log("vitepress config 写入成功~")
  })
}

const processAction = (action) => {
  return replaceKeywords(actionTemplate, (key) => action[key] || '')
}

const processFeature = (feature) => {
  let feat = replaceKeywords(featureTemplate, (key) => feature[key] || '')
  if (feature.icon) {
    feat += `\n    icon: ${feature.icon}`
  }
  return feat
}

export const processVitePressIndexMD = async () => {
  const { press, blog } = configurations

  const replacer = (key) => {
    if (key === "actions") {
      return (
        press.actions
          ?.map(processAction)
          .join("\n") || ""
      )
    } else if (key === "features") {
      return (
        press.features
          ?.map(processFeature)
          .join("\n") || ""
      )
    } else {
      return blog[key] || press[key] || ""
    }
  }

  const md = replaceKeywords(mdTemplate, replacer)

  await mkDir(DOCS_FILE_PATH)
  writeFileSync(`${DOCS_FILE_PATH}/index.md`, md, (err) => {
    if (err) throw err
    console.log("vitepress index.md 写入成功~")
  })
}
