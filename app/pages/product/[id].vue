<template>
  <div class="product-detail-page">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      ← 返回
    </button>

    <div v-if="product" class="product-detail">
      <!-- 产品图片 -->
      <div class="product-image">
        <img :style="{viewTransitionName: `product-image-${id}`}" :src="product.image" :alt="product.name" />
        <span v-if="product.stock === 0" class="out-of-stock">已售罄</span>
      </div>

      <!-- 产品信息 -->
      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-desc">{{ product.description }}</p>

        <div class="product-price">¥{{ product.price.toFixed(2) }}</div>

        <div class="stock-info">
          <span :class="['stock-status', { 'out-stock': product.stock === 0 }]">
            {{ product.stock > 0 ? `库存: ${product.stock}件` : '暂时缺货' }}
          </span>
        </div>

        <!-- 数量选择 -->
        <div v-if="product.stock > 0" class="quantity-selector">
          <span class="label">数量:</span>
          <div class="quantity-control">
            <button @click="decreaseQuantity">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button
            class="add-cart-btn"
            :disabled="product.stock === 0"
            @click="addToCart"
          >
            加入购物车
          </button>
          <button
            class="buy-now-btn"
            :disabled="product.stock === 0"
            @click="buyNow"
          >
            立即购买
          </button>
        </div>
      </div>
    </div>

    <!-- 未找到产品 -->
    <div v-else class="not-found">
      <p>产品不存在或已下架</p>
      <button class="back-list-btn" @click="goToList">返回列表</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
console.log('详情页加载，id:', id)

// 在 DOM 更新后检查 viewTransitionName
onMounted(() => {
    const imgs = document.querySelectorAll('img')
    imgs.forEach(img => {
        const vtName = (img.style as any).viewTransitionName || img.getAttribute('style')
        if (vtName) {
            console.log('详情页 viewTransitionName:', vtName)
        }
    })
})

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

// 产品详情数据
const product = computed(() => products.value.find(el => el.id == id)!)

// 数量
const quantity = ref(1)

// 增加数量
const increaseQuantity = () => {
  if (quantity.value < product.value!.stock) {
    quantity.value++
  }
}

// 减少数量
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 加入购物车
const addToCart = () => {
  alert(`已将 ${quantity.value} 件 "${product.value!.name}" 加入购物车`)
}

// 立即购买
const buyNow = () => {
  alert(`立即购买 ${quantity.value} 件 "${product.value!.name}"`)
}

// 返回上一页
const goBack = () => {
  router.back()
}

// 返回列表页
const goToList = () => {
  router.push('/list')
}
</script>


<style lang="scss" scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 24px;
  transition: all 0.2s;

  &:hover {
    border-color: #007AFF;
    color: #007AFF;
  }
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.product-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .out-of-stock {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 59, 48, 0.9);
    color: white;
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
  }
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .product-category {
    display: inline-block;
    padding: 4px 12px;
    background: #f0f0f0;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    width: fit-content;
  }

  .product-name {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    line-height: 1.2;
  }

  .product-desc {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }

  .product-price {
    font-size: 36px;
    font-weight: bold;
    color: #FF3B30;
  }

  .stock-info {
    .stock-status {
      font-size: 14px;
      color: #34C759;
      font-weight: 500;

      &.out-stock {
        color: #FF3B30;
      }
    }
  }

  .quantity-selector {
    display: flex;
    align-items: center;
    gap: 16px;

    .label {
      font-size: 14px;
      color: #666;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;

      button {
        width: 40px;
        height: 40px;
        background: #f5f5f5;
        border: none;
        cursor: pointer;
        font-size: 18px;
        transition: background 0.2s;

        &:hover {
          background: #e0e0e0;
        }
      }

      .quantity {
        width: 60px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    button {
      flex: 1;
      padding: 16px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }

    .add-cart-btn {
      background: #007AFF;
      color: white;

      &:hover:not(:disabled) {
        background: #0051D5;
      }
    }

    .buy-now-btn {
      background: #FF9500;
      color: white;

      &:hover:not(:disabled) {
        background: #E68600;
      }
    }
  }
}

.not-found {
  text-align: center;
  padding: 80px 20px;

  p {
    font-size: 18px;
    color: #999;
    margin-bottom: 24px;
  }

  .back-list-btn {
    padding: 12px 24px;
    background: #007AFF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #0051D5;
    }
  }
}
</style>
