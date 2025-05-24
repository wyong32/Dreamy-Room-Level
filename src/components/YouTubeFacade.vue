<template>
  <div class="youtube-facade" :class="{ 'facade-loaded': isLoaded }">
    <!-- 占位符容器 -->
    <div v-if="!isLoaded" class="youtube-placeholder" @click="loadYouTube">
      <!-- 缩略图 -->
      <img
        :src="thumbnailUrl"
        :alt="title || 'YouTube video thumbnail'"
        class="youtube-thumbnail"
        loading="lazy"
        decoding="async"
      />

      <!-- 播放按钮 -->
      <div class="play-button">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path
            class="play-button-bg"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
          ></path>
          <path class="play-button-icon" d="M 45,24 27,14 27,34"></path>
        </svg>
      </div>
    </div>

    <!-- YouTube iframe (仅在点击后加载) -->
    <iframe
      v-if="isLoaded"
      :src="videoUrl"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="youtube-iframe"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  autoThumbnail: {
    type: Boolean,
    default: true,
  },
  customThumbnail: {
    type: String,
    default: '',
  },
})

const { t } = useI18n()

// 状态
const isLoaded = ref(false)

// 计算属性：获取视频ID和缩略图URL
const videoId = computed(() => {
  // 从URL中提取视频ID
  const url = props.videoUrl
  let id = ''

  if (url.includes('youtube.com/embed/')) {
    id = url.split('youtube.com/embed/')[1].split('?')[0]
  } else if (url.includes('youtube.com/watch?v=')) {
    id = url.split('youtube.com/watch?v=')[1].split('&')[0]
  } else if (url.includes('youtu.be/')) {
    id = url.split('youtu.be/')[1].split('?')[0]
  }

  return id
})

const thumbnailUrl = computed(() => {
  if (props.customThumbnail) {
    return props.customThumbnail
  }

  if (props.autoThumbnail && videoId.value) {
    // 使用YouTube缩略图API
    return `https://img.youtube.com/vi/${videoId.value}/hqdefault.jpg`
  }

  // 默认占位图
  return '/images/video-placeholder.webp'
})

// 方法：加载YouTube视频
const loadYouTube = () => {
  isLoaded.value = true

  // 发送事件以便跟踪
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'youtube_facade_click', {
      video_id: videoId.value,
      video_title: props.title,
    })
  }
}

// 生命周期钩子
onMounted(() => {
  // 预连接到YouTube域名以提高性能
  const preconnectYouTube = () => {
    const links = [
      { rel: 'preconnect', href: 'https://www.youtube.com' },
      { rel: 'preconnect', href: 'https://www.youtube-nocookie.com' },
      { rel: 'preconnect', href: 'https://i.ytimg.com' },
    ]

    links.forEach((linkData) => {
      if (!document.querySelector(`link[href="${linkData.href}"]`)) {
        const link = document.createElement('link')
        link.rel = linkData.rel
        link.href = linkData.href
        document.head.appendChild(link)
      }
    })
  }

  // 当用户与页面交互后预连接
  const handleFirstInteraction = () => {
    preconnectYouTube()
    // 移除事件监听器
    document.removeEventListener('mousemove', handleFirstInteraction)
    document.removeEventListener('touchstart', handleFirstInteraction)
  }

  document.addEventListener('mousemove', handleFirstInteraction, { once: true })
  document.addEventListener('touchstart', handleFirstInteraction, { once: true })
})
</script>

<style scoped>
.youtube-facade {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #000;
  aspect-ratio: 16 / 9;
  /* 防止CLS - 固定宽高比 */
  min-height: 200px;
}

.youtube-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  transition: all 0.3s ease;
}

.youtube-placeholder:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.youtube-placeholder:hover .play-button {
  transform: scale(1.1);
}

.youtube-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.play-button {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.play-button-bg {
  fill: #212121;
  fill-opacity: 0.8;
}

.play-button-icon {
  fill: #fff;
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .youtube-facade {
    min-height: 180px;
  }
}
</style>
