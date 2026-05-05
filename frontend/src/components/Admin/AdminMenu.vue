<template>
    <Menu :model="items">
        <template #item="{item, props }">
            <router-link v-ripple v-bind="props.action" :to="item.to">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
                <Badge v-if="item.badge" class="ml-auto", :value="item.badge"></Badge>
            </router-link>
        </template>
    </Menu>
</template>


<script src="@/scripts/Admin/AdminMenu.js" />
<style src="@/css/Admin/AdminMenu.css" />



