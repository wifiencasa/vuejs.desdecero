import Indecision from '@/components/Indecision.vue';
<template>
  <!-- Hacemos binding con image -->
  <img
    v-if="image"
    :src="image"
    alt="bg"
  />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <h1>{{ titulo }}</h1>
    <input
      type="text"
      placeholder="Hazme una pregunta"
      v-model.trim="question"
    />
    <p>Recuerda terminar con un signo de interrogación (?)</p>
    <div>
      <h2 v-if="isValidQuestion">{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Indecision',
    // Mis propiedades

    props: {
      titulo: {
        type: String,
        default: 'Indecision',
      },
    },

    // eventos que emito
    emits: ['question-response'],

    // Mi estado
    data() {
      return {
        question: '',
        answer: null,
        image: null,
        isValidQuestion: false,
      }
    },

    // Mis métodos
    methods: {
      async getAnswer() {
        try {
          this.answer = 'Pensando...'
          // Obtenemos una respuesta y desestructuramos
          const { answer, image } = await fetch('https://yesno.wtf/api').then((res) => res.json())

          this.answer = answer === 'yes' ? 'Sí' : 'No'
          this.image = image
          // Mandamos el evento y su parámetro, si lo hay
          this.$emit('question-response', { respuesta: this.answer })
        } catch (error) {
          this.answer = 'No se pudo cargar de la API la respuesta'
          this.image = null
        }
      },
    },

    // Mis watchers
    watch: {
      // Observamos question
      question(newQuestion) {
        // Si la pregunta cambia
        console.log(newQuestion)
        // Si la pregunta termina con un signo de interrogación y tiene más que eso :)
        this.isValidQuestion = false
        if (newQuestion.endsWith('?') && newQuestion.length > 1) {
          this.isValidQuestion = true
          this.getAnswer()
        }
      },
    },
  }
</script>

<style scoped>
  img,
  .bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
  }

  .bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .indecision-container {
    position: relative;
    z-index: 99;
  }

  input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    margin: 1rem;
  }
  input:focus {
    outline: none;
  }

  p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
  }

  h1,
  h2 {
    color: white;
  }

  h2 {
    margin-top: 150px;
  }
</style>
