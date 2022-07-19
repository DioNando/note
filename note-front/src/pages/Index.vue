<template>
  <q-page padding>
    <Container>
      <div class="row items-center justify-between">
        <h3>Your notes</h3>
        <div>
          <q-btn round color="accent" icon="add" to="/new"></q-btn>
        </div>
      </div>
      <NoteCard
        v-for="(note, i) in notes"
        :key="i"
        :title="note.title"
        :description="note.description"
        @click="router.push(`/note/${note.id}`)"
      />
      <div v-if="notes.length === 0">You have not created any notes</div>
    </Container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Container from "src/components/Container.vue";
import NoteCard from "src/components/NoteCard.vue";
import { getAllNotes } from "src/api/note";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageIndex",
  components: {
    NoteCard,
    Container,
  },
  data() {
    return {
      notes: [],
    };
  },
  setup() {
    const router = useRouter();

    return { router };
  },
  mounted() {
    getAllNotes()
      .then((result) => {
        this.notes = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
});
</script>
