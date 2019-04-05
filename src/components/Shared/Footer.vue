<template>
  <v-footer color="primary">
    <v-flex
      primary
      py-3
      text-xs-center
      white--text
      xs12
    >
      &copy;{{ new Date().getFullYear() }} — <strong>SPMS</strong>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

