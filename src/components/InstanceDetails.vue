<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card text-center shadow-lg" style="width: 20rem; border-radius: 15px; background-color: #f8f9fa;">
      <div class="card-body">
        <h4 class="card-title mb-3" style="color: #007bff;">Instance Details</h4>
        <p class="card-text"><strong>Course Title:</strong> {{ courseTitle }}</p>
        <p class="card-text"><strong>Year:</strong> {{ instance.year }}</p>
        <p class="card-text"><strong>Semester:</strong> {{ instance.semester }}</p>
        <p class="card-text"><strong>Course Code:</strong> {{ courseCode }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      instance: {},
      courseTitle: '',
      courseCode: '',
    };
  },
  async created() {
    const instanceId = this.$route.params.id;
    const instanceResponse = await axios.get(`http://localhost:8080/api/instances/${instanceId}`);
    this.instance = instanceResponse.data;

    const courseResponse = await axios.get(`http://localhost:8080/api/courses/${this.instance.courseId}`);
    this.courseTitle = courseResponse.data.title;
    this.courseCode = courseResponse.data.courseCode;
  },
};
</script>
