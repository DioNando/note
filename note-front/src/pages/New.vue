<template>
  <q-page padding>
    <Container>
      <h3>New note</h3>
      <form @submit="submitAddNote">
        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.title"
          label="Title"
          required
        />
        <q-input
          class="q-mt-sm"
          outlined
          dense
          v-model="note.description"
          label="Description"
          required
        />
        <q-card flat bordered class="q-mt-sm">
          <q-editor v-model="note.content" min-height="7rem" />
        </q-card>

        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn class="q-ml-sm" color="primary" type="submit">Create</q-btn>
        </div>
      </form>
    </Container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Container from "src/components/Container.vue";
import { useRouter } from "vue-router";
import { addNote } from "src/api/note";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageNew",
  components: {
    Container,
  },
  data() {
    return {
      note: {
        title: "",
        description: "",
        content: "",
      },
    };
  },
  setup() {
    const router = useRouter();
    const toast = useQuasar();

    return { router, toast };
  },
  methods: {
    submitAddNote() {
      addNote(this.note)
        .then(() => {
          this.router.push(`/`);
          this.toast.notify({
            type: "positive",
            message: "New post was created",
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.log(error);
          this.toast.notify({
            type: "negative",
            message: "Some error occured when creating the note",
            position: "bottom-right",
          });
        });
    },
  },
});
</script>
