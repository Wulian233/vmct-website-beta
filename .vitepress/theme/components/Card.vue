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
    <span class="i-custom-discord"></span>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'
import { isLinkExternal, isRelativeLink } from '../utils'
import { computed } from 'vue'

import '../styles/card.css'

const props = withDefaults(defineProps(), {
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
  'bilibili.com': 'i-custom-bilibili',
  'discord': 'i-custom-discord',
  'qq.com': 'i-custom-qq',
}

const imgLoadHandler = (e) => {
  e.target.classList.remove('skeleton-animation')
}

const imgErrorHandler = (e) => {
  e.target.classList.add('load-error')
  e.target.src = '/imgs/missing.png'
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
    const prefix = props.link.substring(0, 3).replace(/(\.\/|\/)/g, '')
    const suffix = props.link.substring(3)
    console.log(location.href)
    return location.origin + withBase(`/${prefix}${suffix}`)
  } else {
    return props.link
  }
})
</script>
