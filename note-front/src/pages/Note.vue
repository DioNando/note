<template>
  <q-page padding>
    <Container>
      <div v-if="editing">
        <h3>Modification</h3>
        <form @submit.prevent="submitUpdateNote">
          <q-input
            class="q-mt-sm"
            outlined
            v-model="note.title"
            label="Title"
          />
          <q-input
            class="q-mt-sm"
            outlined
            dense
            v-model="note.description"
            label="Description"
          />
          <q-card flat bordered class="q-mt-sm">
            <q-editor v-model="note.content" min-height="7rem" />
          </q-card>

          <div class="q-mt-md">
            <q-btn color="grey" @click="editing = false" type="reset"
              >Cancel</q-btn
            >
            <q-btn class="q-ml-sm" color="primary" type="submit">Update</q-btn>
          </div>
        </form>
      </div>
      <div v-else>
        <div class="row items-center justify-between">
          <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
          <div>
            <q-btn
              round
              color="primary"
              icon="home"
              @click="router.push(`/`)"
            />
            <q-btn
              class="q-ml-sm"
              round
              color="accent"
              icon="edit"
              @click="editing = true"
            />
            <q-btn
              class="q-ml-sm"
              round
              color="grey"
              icon="delete"
              @click="submitDeleteNote"
            />
          </div>
        </div>
        <h5>{{ note.description }}</h5>
        <div class="q-mt-md" v-html="note.content" />
      </div>
    </Container>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "src/components/Container.vue";
import { getNote, updateNote, deleteNote } from "src/api/note";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageNote",
  components: { Container },
  data() {
    return {
      note: {
        title: "",
        description: "",
        content: "",
      },
      noteId: useRoute().params.id,
    };
  },
  setup() {
    const editing = ref(false);
    const router = useRouter();
    const toast = useQuasar();

    return { router, editing, toast };
  },
  mounted() {
    getNote(this.noteId)
      .then((result) => {
        this.note = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    submitUpdateNote() {
      updateNote(this.noteId, this.note)
        .then(() => {
          this.editing = false;
          this.toast.notify({
            type: "positive",
            message: "Note was updated successfully",
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.log(error);
          this.toast.notify({
            type: "negative",
            message: "Some error occured when updating the note",
            position: "bottom-right",
          });
        });
    },

    submitDeleteNote() {
      deleteNote(this.noteId)
        .then(() => {
          this.router.push("/");
          this.toast.notify({
            type: "warning",
            message: "Note was deleted successfully",
            position: "bottom-right",
          });
        })
        .catch((error) => {
          console.log(error);
          this.toast.notify({
            type: "negative",
            message: "Some error occured when deleting the note",
            position: "bottom-right",
          });
        });
    },
  },
});
</script>
