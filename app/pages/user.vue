<template>
<div>
    <h1>用户页面</h1>
    <div v-if="loading">加载中...</div>
    <div v-else>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }} - {{ user.email }}
            </li>
        </ul>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

interface User {
    id: number
    name: string
    email: string
}

const users = ref<User[]>([])
const loading = ref(true)

const fetchUsers = async () => {
    try {
        loading.value = true
        const response = await useFetch<Array<User>>('/api/user')
        users.value = response.data.value!
    } catch (error) {
        console.error('获取用户列表失败:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchUsers()
})
</script>

<style lang="scss" scoped>

</style>