import { gql, request } from "graphql-request";
const MASTER_URL =
  "https://ap-southeast-2.cdn.hygraph.com/content/clsjupkbk3i3401wjmq1isl9k/master";

const getEducations = async () => {
  const query = gql`
    query getEducations {
      educations {
        author
        educationImage {
          url
        }
        id
        isWatched
        title
        videoType
        duration
        isWatched
        isBookmark
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const getGames = async () => {
  const query = gql`
    query MyQuery {
      games {
        gameImage {
          url
        }
        id
        subtitle
        title
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const updateMarkAsDone = async (id, condition) => {
  const query = gql`
    mutation updateMarkAsDone {
      updateEducation(data: { isWatched: ${condition} }, where: { id: "${id}" }) {
        id
        isWatched
      }
      publishManyEducations(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const createNote = async (title, note, noteType, educationTitle) => {
  const query = gql`
    mutation createNote {
      createEducationNote(
        data: {
          title: "${title}"
          note: "${note}"
          noteType: ${noteType}
          education: { connect: { title: "${educationTitle}" } }
        }
      ) {
        id
      }
      publishManyEducationNotes(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const getNote = async (title) => {
  const query = gql`
    query getNote {
      educationNotes(where: { education: { title: "${title}" } }) {
        note
        noteType
        title
        id
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const deleteNote = async (title) => {
  const query = gql`
    mutation deleteNote {
      deleteEducationNote(where: { title: "${title}" }) {
        id
      }
    }
  `;
  console.log("PROSES BOSSS");
  return await request(MASTER_URL, query);
};

const updateNote = async (title, note, id) => {
  const query = gql`
    mutation updateNote {
      updateEducationNote(data: { note: "${note}", title: "${title}" }, where: { id: "${id}" }) {
        id
        note
        title
      }
      publishManyEducationNotes(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const updateBookmark = async (id, condition) => {
  const query = gql`
    mutation updateBookmark {
      updateEducation(data: { isBookmark: ${condition} }, where: { id: "${id}" }) {
        isBookmark
        id
        title
      }
      publishManyEducations(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const getBookmarkedEducations = async () => {
  const query = gql`
    query getBookmarkedEducations {
      educations(where: { isBookmark: true }) {
        author
        educationImage {
          url
        }
        id
        isWatched
        title
        videoType
        duration
        isWatched
        isBookmark
      }
    }
  `;
  return await request(MASTER_URL, query);
};

export default {
  getEducations,
  getGames,
  updateMarkAsDone,
  createNote,
  getNote,
  deleteNote,
  updateNote,
  updateBookmark,
  getBookmarkedEducations,
};
