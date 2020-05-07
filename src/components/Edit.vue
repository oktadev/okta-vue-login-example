<template>
  <div class="content">
    <h2>Edit Page</h2>
    <textarea class="page-input" :value="input" @input="update"></textarea>
    <div class="buttons">
      <md-button class="md-raised" v-on:click="saveContent">Save</md-button>
      <md-button class="md-raised"><router-link to="read">View Page</router-link></md-button>
    </div>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import marked from 'marked';
  import { getContent, setContent } from '../content';

  export default {
    name: 'Edit',
    data: () => ({
      input: getContent()
    }),
    computed: {
      compiledMarkdown: function() {
        return marked(this.input, { sanitize: true });
      }
    },
    methods: {
      update: _.debounce(function(e) {
        this.input = e.target.value;
      }, 300),
      saveContent: function() {
        setContent(this.input);
        alert('Content updated!');
      }
    }
  }
</script>

<style>
  .page-input {
    width: 100%;
    min-height: 128px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>
