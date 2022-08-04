<template class="test-page">
    <div>
        <div v-for="(item, index) in dataR" :key="index">
            <p>{{ item.question }}</p>
            <p>{{ item.correct_answer }}</p>
            <hr>
            
        </div>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "testPage",
    props: {
    },
    data() {
        return {
            dataR: {},
        }
    },
    created() {
        axios.get("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
            .then((response) => {
                this.dataR = response.data.results;
                console.log(this.dataR)
            });
    }
}
</script>
<style>
</style>