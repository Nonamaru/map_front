<template>
    <input type="text" v-model="input" placeholder="Search fruits..." />
   <div class="item fruit" v-for="title in filteredList()" :key="title">
     <p v-if="title">{{ title }}</p>
   </div>
   <div class="item error" v-if="input&&!filteredList().length">
      <p>No results found!</p>
   </div>
 </template>

 <script>
 export default {
    data() {
        return {
            input: "",
            titles: ["apple", "banana", "orange", "Apply"],
        }
    },
    methods: {
        filteredList() {
            return this.titles.filter((title) =>
            title.toLowerCase().includes(this.input.toLowerCase()));
        }
    }
 }
 </script>