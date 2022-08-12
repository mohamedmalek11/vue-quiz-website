<template class="test-page">
    <!-- prevent showing page after question ends -->
    <!-- prevent shoing page in arrey is empty  -->
    <button @click="$router.push('/')" class="homeButton">home</button>
    <div v-if="dataR.length != 0 && questionCount < 10" class="wrapper">
        <h2>{{ questionCount + 1 }}. {{ dataR[questionCount].question }}</h2>

        <div v-for="(item, index) in answers" :key="index" class="options">
            <input type="radio" :id="index" name="slectedAns" :value="item" v-model="slectedAns">
            <label :for="index">{{ item }}</label>
        </div>
        <hr>
        <div class="buttons">
            <button v-if="questionCount > 0"
                @click="perviosButton(); (questionCount >= 0 ? questionCount-- : questionCount === 0); answersGenerate(); changePagerout();">Pervios</button>

            <button
                @click="pointsCounter(); (questionCount < 10 && (!selectedAnsArr.includes('')) ? questionCount++ : questionCount === 10); answersGenerate(); changePagerout();">Next</button>
        </div>
        <p class="chooseAnswer" v-if="selectedAnsArr.includes('')">please choose an answer</p>
        <!-- prevent unanswering for question -->


    </div>
    <!-- show results after answering all questions -->
    <div v-if="dataR.length != 0 && questionCount == 10">
        <h2>results</h2>
        <div class="resultsWraper">
            <div class="results">
                <h4>question</h4>
                <ul class="results-col">
                    <li v-for="item in dataR" :key="item"> {{ item.question }}</li>

                </ul>
            </div>
            <div class="results">
                <h4>correct answer</h4>
                <ul class="results-col">
                    <li v-for="item in dataR" :key="item"> {{ item.correct_answer }}</li>
                </ul>
            </div>
            <div class="results">
                <h4>your answer</h4>
                <ul class="results-col">
                    <li v-for="item in selectedAnsArr" :key="item"> {{ item }}</li>
                </ul>
            </div>
            <div class="results">
                <h4>points</h4>
                <ul class="results-col">
                    <li v-for="(item, index) in selectedAnsArr" :key="index">
                        {{ selectedAnsArr[index] === dataR[index].correct_answer ? '1' : '0' }}</li>
                </ul>
                <h3>score</h3>
                <p>{{ points }}</p>
            </div>
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
            dataR: [],
            questionCount: 0,
            answers: [],
            slectedAns: '',
            points: 0,
            selectedAnsArr: [" "],
            pageNum: 1
        }
    },
    methods: {
        perviosButton: function () {
            this.slectedAns = '';
            // replace new answer
            this.selectedAnsArr.splice(this.questionCount, this.questionCount, this.slectedAns);
            this.selectedAnsArr.pop();
            // clears answers score To prevent point increase on the same question
            if (this.selectedAnsArr.includes(this.dataR[this.questionCount - 1].correct_answer)) {
                this.points--;
            } else { this.points; }

        },
        answersGenerate: function () {
            // shuffle correct answer with incorrect answers
            if (this.questionCount < 10) {
                let basicAnswers = [...this.dataR[this.questionCount].incorrect_answers, this.dataR[this.questionCount].correct_answer];
                this.answers = basicAnswers.sort();
            }
        },
        changePagerout: function () {
            this.pageNum = this.questionCount + 1;
            this.$router.push(`/${this.pageNum}`)
        },
        pointsCounter: function () {
            // add anwer to anwers arrey
            this.selectedAnsArr.splice(this.questionCount, this.questionCount + 1, this.slectedAns);
            // add point for true answer
            if (this.selectedAnsArr.includes(this.dataR[this.questionCount].correct_answer)) {
                this.points++;
            } else { this.points; }
            // clear anwer
            this.slectedAns = '';
        }
    },
    async mounted() {
        try {
            let response = await axios.get("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
            this.dataR = response.data.results;
        } catch (err) {
            console.log(err)
            alert(err)
        }
        this.answersGenerate();
        this.changePagerout();
    },
}
</script>
<style>
.wrapper {
    border: 1px solid #ddd;
    margin: 20px;
    text-align: start;
    padding: 10px 20px;
}

.options {
    margin: 10px 20px;
}

.buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10px;
}

.chooseAnswer {
    color: red;
}

.resultsWraper {
    display: flex;
    justify-content: start;
    text-align: start;
    margin: 20px;
}

.homeButton {
    background-color: white;
    color: #42b983;
    padding: 0px;
}

.results-col {
    padding-inline-start: 0px;
}

.results-col li {
    list-style-type: none;
    padding: 20px 10px;

}
</style>