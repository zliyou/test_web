<template>
  <div class="product-list-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>产品列表</h1>
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索产品..."
          class="search-input"
        />
      </div>
    </div>

    <!-- 分类筛选 -->
    <div class="category-filter">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['filter-btn', { active: selectedCategory === cat }]"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>
    <DynamicScroller
    v-if="false"
      :items="products"
      :min-item-size="54"
      class="scroller"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :index="index"
        >
          <div class="avatar">
            <img
              :key="item.image"
              :src="item.image"
              alt="avatar"
              class="image"
            >
          </div>
          <div class="text">
            {{ item.name }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <!-- 产品列表 -->
    <div class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        @click="goToDetail(product.id)"
      >
        <div class="product-image">
          <img :style="product.id === active ? {viewTransitionName: `product-image-${product.id}`} : {}" :src="product.image" :class="product.id == active && 'active'" :alt="product.name" />
          <span v-if="product.stock === 0" class="out-of-stock">已售罄</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">¥{{ product.price.toFixed(2) }}</span>
            <button
              class="add-cart-btn"
              :disabled="product.stock === 0"
              @click.stop="addToCart(product)"
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <p>暂无产品数据</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

// 搜索和筛选状态
const searchQuery = ref('')
const selectedCategory = ref('全部')
const active = ref<number | null>(null)

// 产品数据
const products = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro',
    description: '苹果最新旗舰手机',
    price: 7999,
    category: '手机',
    image: 'https://fastly.picsum.photos/id/243/300/300.jpg?hmac=RSX6867itiTeEDHAcmUcUKY7jljGINYQH0q-Wz2HiV0',
    stock: 100
  },
  {
    id: 2,
    name: 'MacBook Pro 14',
    description: 'M3 芯片笔记本电脑',
    price: 14999,
    category: '电脑',
    image: 'https://fastly.picsum.photos/id/701/300/300.jpg?hmac=I01SYsoRBR6HATSI9xSORt0XIUpz5E5wFpkr02_Ps7A',
    stock: 50
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    description: '主动降噪无线耳机',
    price: 1799,
    category: '耳机',
    image: 'https://fastly.picsum.photos/id/941/300/300.jpg?hmac=mDxM9PWSqRDjecwSCEpzU4bj35gqnG7yA25OL29uNv0',
    stock: 200
  },
  {
    id: 4,
    name: 'iPad Air',
    description: '轻薄便携的平板电脑',
    price: 4799,
    category: '平板',
    image: 'https://fastly.picsum.photos/id/741/300/300.jpg?hmac=KZrJglmFI6XwUZvXA_AQ_nW53PyMZd89NT5hiTt2DIE',
    stock: 0
  },
  {
    id: 5,
    name: 'iPad Air',
    description: '轻薄便携的平板电脑',
    price: 4799,
    category: '平板',
    image: 'https://fastly.picsum.photos/id/941/300/300.jpg?hmac=mDxM9PWSqRDjecwSCEpzU4bj35gqnG7yA25OL29uNv0',
    stock: 0
  },
  {
    id: 6,
    name: 'iPad Air',
    description: '轻薄便携的平板电脑',
    price: 4799,
    category: '平板',
    image: 'https://fastly.picsum.photos/id/741/300/300.jpg?hmac=KZrJglmFI6XwUZvXA_AQ_nW53PyMZd89NT5hiTt2DIE',
    stock: 0
  },
])

// 分类列表
const categories = computed(() => {
  const cats = ['全部', ...new Set(products.value.map(p => p.category))]
  return cats
})

// 筛选后的产品
const filteredProducts = computed(() => {
  let result = products.value

  // 分类筛选
  if (selectedCategory.value !== '全部') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  return result
})

// 跳转到产品详情
const goToDetail = (id: number) => {
    console.log('准备跳转到产品:', id)
    active.value = id

    // 先更新 URL（同步）
    history.pushState(null, '', `/product/${id}`)

    // 然后在下一帧启动 View Transition
    requestAnimationFrame(() => {
        if ('startViewTransition' in document) {
            console.log('启动 View Transition')
            ;(document as any).startViewTransition(() => {
                // 空的回调，只是触发过渡
                console.log('View Transition 回调执行')
            })
        }
    })

    // 同时触发页面更新
    navigateTo(`/product/${id}`)
}

// 加入购物车
const addToCart = (product: any) => {
  alert(`已将 "${product.name}" 加入购物车`)
}
</script>


<style lang="scss" scoped>
.scroller {
  height: 200px;
  position: relative;
  overflow-y: auto;
}
.product-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }

  .search-box {
    .search-input {
      padding: 10px 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      width: 250px;
      outline: none;
      transition: border-color 0.2s;

      &:focus {
        border-color: #007AFF;
      }
    }
  }
}

.category-filter {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  .filter-btn {
    padding: 8px 20px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;

    &:hover {
      border-color: #007AFF;
      color: #007AFF;
    }

    &.active {
      background: #007AFF;
      color: white;
      border-color: #007AFF;
    }
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .product-image {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .out-of-stock {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
    }
  }

  .product-info {
    padding: 16px;

    .product-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .product-desc {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .product-price {
        font-size: 20px;
        font-weight: bold;
        color: #FF3B30;
      }

      .add-cart-btn {
        padding: 8px 16px;
        background: #007AFF;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;

        &:hover:not(:disabled) {
          background: #0051D5;
        }

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}
</style>

