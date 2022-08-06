<template class="test-page">
    <div v-if="dataR.length != 0 && questionCount < 10">
        <h2>{{ questionCount + 1 }}. {{ dataR[questionCount].question }}</h2>
        <p></p>
        <div v-for="(item, index) in answers" :key="index">
            <input type="radio" :id="questionCount" name="slectedAns" :value="item" v-model="slectedAns">
            <label :for="item">{{ item }}</label>
        </div>
        <hr>
        <h1>{{ points }}</h1>
        <button
            @click="perviosButton(); (questionCount > 0 ? questionCount-- : questionCount === 0); answersGenerate();">Pervios</button>
        <button
            @click="pointsCounter(); (questionCount < 10 ? questionCount++ : questionCount === 10); answersGenerate();">Next</button>
    </div>

    <div v-if="dataR.length != 0 && questionCount == 10">
        <h2>results</h2>
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
            dataR: [],
            questionCount: 0,
            answers: [],
            slectedAns: '',
            points: 0,
            selectedAnsArr: [""],
        }
    },
    methods: {
        perviosButton: function () {
            this.slectedAns = '';
            this.selectedAnsArr.splice(this.questionCount, this.questionCount + 1, this.slectedAns);
            console.log(this.selectedAnsArr);
            console.log(this.dataR[this.questionCount - 1].correct_answer);
            if (this.selectedAnsArr.includes(this.dataR[this.questionCount - 1].correct_answer)) {
                this.points--;
                console.log(this.selectedAnsArr);
            } else { this.points; }

        },
        answersGenerate: function () {
            if (this.questionCount < 9) {
                let basicAnswers = [...this.dataR[this.questionCount].incorrect_answers, this.dataR[this.questionCount].correct_answer];
                this.answers = basicAnswers.sort();
            }

        },
        pointsCounter: function () {
            this.selectedAnsArr.splice(this.questionCount, this.questionCount + 1, this.slectedAns);
            if (this.selectedAnsArr.includes(this.dataR[this.questionCount].correct_answer)) {
                this.points++;
            } else { this.points; }

            this.slectedAns = '';
        }
    },
    async mounted() {
        try {
            let response = await axios.get("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
            this.dataR = response.data.results;
            console.log(this.dataR);
        } catch (err) {
            console.log(err)
        }
        this.answersGenerate();
    },
}
</script>
<style>
</style>