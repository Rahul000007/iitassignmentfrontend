<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card text-center shadow-lg" style="width: 20rem; border-radius: 15px; background-color: #f8f9fa;">
      <div class="card-body">
        <h4 class="card-title mb-3" style="color: #007bff;">Course Details</h4>
        <p class="card-text"><strong>Title:</strong> {{ course.title }}</p>
        <p class="card-text"><strong>Code:</strong> {{ course.courseCode }}</p>
        <p class="card-text"><strong>Description:</strong> {{ course.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CourseDetails',
  data() {
    return {
      course: {},
    };
  },
  async created() {
    const courseId = this.$route.params.id;
    const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
    this.course = response.data;
  },
};
</script>
