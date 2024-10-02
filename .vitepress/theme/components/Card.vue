<template>
  <a
    :href="isExternal ? link : withBase(link)"
    :target="isExternal ? '_blank' : '_self'"
    :class="`card card-theme-${theme} ${hoverShadow ? 'card-hover' : ''}`"
    :title="title"
    :style="{
      ...(color ? { background: color } : null),
      ...(shadow ? { 'box-shadow': 'var(--vp-shadow-1)' } : null),
    }"
    :is-external-link="isExternal ? 'true' : 'false'"
  >
    <div v-if="cover" class="card-cover-contanier">
      <img
        class="card-cover-img no-zoomable skeleton-animation"
        @load="imgLoadHandler"
        @error="imgErrorHandler"
        :src="coverLink"
      />
    </div>

    <div :class="`card-footer ${logoMissing && !icon ? 'no-logo' : ''}`">
      <template v-if="iconLink">
        <label :class="`card-icon ${iconLink}`"></label>
      </template>
      <template v-else>
        <template v-if="!logoMissing">
          <img class="card-logo no-zoomable" :src="logoLink" />
        </template>
      </template>

      <div class="card-content">
        <div class="card-title">
          {{ title }}
        </div>
        <hr />
        <ClientOnly>
          <div class="card-desc">
            {{ descText }}
          </div>
        </ClientOnly>
      </div>
    </div>
  </a>

  <!-- 在这里显式声明Logo，给Unocss识别导入 -->
  <div v-once hidden>
    <span class="i-custom-123"></span>
    <span class="i-custom-afdian"></span>
    <span class="i-custom-bilibili"></span>
    <span class="i-custom-curseforge"></span>
    <span class="i-custom-discord"></span>
    <span class="i-custom-gitee"></span>
    <span class="i-custom-github"></span>
    <span class="i-custom-mediafire"></span>
    <span class="i-custom-modrinth"></span>
    <span class="i-custom-qq"></span>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { isLinkExternal, isRelativeLink } from '../utils'
import { computed } from 'vue'

import '../styles/card.css'

interface CardProps {
  /**
   * Card title
   *
   * 卡片标题，必填项
   *
   */
  title: string

  /**
   * Card description
   *
   * 卡片描述，为空时默认显示为 link
   */
  desc?: string

  /**
   * Card icon
   *
   * 卡片图标，默认为项目 Logo
   */
  logo?: string

  /**
   * Card link
   *
   * 卡片链接
   */
  link?: string

  /**
   * Card color
   *
   * 卡片链颜色
   */
  color?: string

  /**
   * Card cover
   *
   * 卡片封面，Only NormalTheme
   */
  cover?: string

  /**
   * Card hover shadow
   *
   * 是否启用卡片 hover 时阴影效果，默认启用
   */
  hoverShadow?: boolean

  /**
   * Card shadow
   *
   * 是否启用卡片阴影效果，默认启用
   */
  shadow?: boolean

  /**
   * Card theme
   *
   * 卡片主题，默认 normal
   */
  theme?: 'normal' | 'medium'
}

const props = withDefaults(defineProps<CardProps>(), {
  desc: '',
  logo: '',
  color: '',
  link: '',
  cover: '',
  theme: 'normal',
  hoverShadow: true,
  shadow: false,
})

const iconMap = {
  '123pan.com': 'i-custom-123',
  'afdian.com': 'i-custom-afdian',
  'afdian.net': 'i-custom-afdian',
  'bilibili.com': 'i-custom-bilibili',
  'curseforge.com': 'i-custom-curseforge',
  'discord': 'i-custom-discord',
  'gitee.com': 'i-custom-gitee',
  'github.com': 'i-custom-github',
  'mediafire.com': 'i-custom-mediafire',
  'modrinth.com': 'i-custom-modrinth',
  'qq.com': 'i-custom-qq',
}

const imgLoadHandler = (e: { target: any; }) => {
  e.target!['classList'].remove('skeleton-animation')
}

const imgErrorHandler = (e: { target: any; }) => {
  e.target!['classList'].add('load-error')
  e.target!['src'] = '/imgs/missing.png'
}

const iconLink = computed(() => {
  let icon = ''

  if (props.logo === '' && props.link !== '') {
    const linkDomain = props.link.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)\//)
    if (linkDomain && linkDomain[1]) {
      const domain = linkDomain[1]
      for (const key in iconMap) {
        if (new RegExp(key).test(domain)) {
          icon = iconMap[key]
          break
        }
      }
    }
  }

  return icon
})

const isExternal = computed(() => isLinkExternal(props.link))

const logoLink = computed(() => {
  if (
    props.logo === 'self' ||
    props.logo.includes('vmct-cn.top') ||
    isRelativeLink(props.link)
  )
    return withBase('/imgs/logo/logo_128.png')
  if (props.logo === '' && iconLink.value === '') return 'no-logo'
  return isRelativeLink(props.logo) ? withBase(props.logo) : props.logo
})

const logoMissing = computed(() => logoLink.value === 'no-logo')

const coverLink = computed(() =>
  isRelativeLink(props.cover) ? withBase(props.cover) : props.cover,
)

const descText = computed(() => {
  if (props.desc) {
    return props.desc
  } else if (isRelativeLink(props.link)) {
    const prefix: string = props.link.substring(0, 3).replace(/(\.\/|\/)/g, '')
    const suffix: string = props.link.substring(3)
    console.log(location.href)
    return location.origin + withBase(`/${prefix}${suffix}`)
  } else {
    return props.link
  }
})
</script>
