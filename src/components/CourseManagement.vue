<template>
  <div class="container">
    <h2 class="text-center my-5">Course Management System</h2>

    <div class="row">

      <div class="col-md-3 mx-auto">
        <div class="mb-4">
          <input type="text" class="form-control mb-2" placeholder="Course Title" v-model="courseTitle"/>
          <input type="text" class="form-control mb-2" placeholder="Course Code" v-model="courseCode"/>
          <input type="text" class="form-control mb-2" placeholder="Course Description" v-model="courseDescription"/>
          <div class="text-center">
            <button class="btn btn-primary btn-sm" @click="addCourse">Add Course</button>
          </div>
        </div>
      </div>

      <div class="col-md-4 mx-auto">
        <div class="d-flex align-items-center mb-2">
          <select class="form-select form-select-sm me-5" v-model="selectedCourseId" style="width: 48%;">
            <option value="" disabled>Select Course</option>
            <option v-for="course in courses" :key="course.courseId" :value="course.courseId">
              {{ course.title }}
            </option>
          </select>
          <button class="btn btn-primary btn-sm w-50" @click="listCourses">Refresh</button>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <input type="text" class="form-control form-control-sm me-2" placeholder="Year" v-model="year"
                 style="width: 45%;"/>
          <input type="text" class="form-control form-control-sm" placeholder="Semester" v-model="semester"
                 style="width: 45%;"/>
        </div>

        <div class="text-center">
          <button class="btn btn-primary btn-sm" @click="addInstance">Add Instance</button>
        </div>
      </div>

    </div>

    <div class="mt-5">
      <div class="text-center">
        <h1 class="btn btn-primary btn-sm">List Courses</h1>
      </div>

      <table class="table table-hover mt-3 m-auto table-responsive table-sm" style="width: 85%">
        <thead>
        <tr>
          <th style="background-color: #005ef8; color: white;">Course Title</th>
          <th style="background-color: #005ef8; color: white;">Code</th>
          <th style="background-color: #005ef8; color: white;">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="course in courses" :key="course.courseId">
          <td>{{ course.title }}</td>
          <td>{{ course.courseCode }}</td>
          <td>
            <button class="btn btn-sm btn-info me-2" @click="goToCourseDetails(course.courseId)">
              🔍
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteCourse(course.courseId)">
              🗑️
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-5">
      <div class="col-md-8 mx-auto">
        <div class="d-flex align-items-center">

          <input type="text" class="form-control form-select-sm me-3" placeholder="Year" v-model="selectedYear"/>

          <select class="form-select form-select-sm me-3" v-model="selectedSemester">
            <option value="" disabled>Select semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>

          <div style="width: 70%;">
            <button class="btn btn-primary btn-sm me-3" @click="listInstances">List Instances</button>
          </div>

        </div>
      </div>
    </div>

    <div class="mt-5">
      <div class="text-center">
        <table class="table table-hover mt-3 m-auto table-responsive table-sm" style="width: 85%">
          <thead class="table-light">
          <tr>
            <th style="background-color: #005ef8; color: white;">Course Title</th>
            <th style="background-color: #005ef8; color: white;">Year-Sem</th>
            <th style="background-color: #005ef8; color: white;">Code</th>
            <th style="background-color: #005ef8; color: white;">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="instance in instances" :key="instance.courseInstanceId">
            <td>{{ getInstanceCourseTitle(instance.courseId) }}</td>
            <td>{{ instance.year }}-{{ instance.semester }}</td>
            <td>{{ getInstanceCourseCode(instance.courseId) }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteInstance(instance.courseInstanceId)">🗑️</button>
              <button class="btn btn-sm btn-info me-2" @click="goToInstanceDetails(instance.courseInstanceId)">
                🔍
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>

</template>


<script>
import axios from 'axios';

import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

export default {
  name: "CourseManagement",

  data() {
    return {
      courseTitle: '',
      courseCode: '',
      courseDescription: '',
      selectedCourseId: '',
      year: '',
      semester: '',
      selectedYear: '',
      selectedSemester: '',
      courses: [],
      instances: [],
    };
  },

  methods: {

    async listCourses() {
      try {
        const response = await axios.get('http://localhost:8080/api/courses');
        this.courses = response.data;
      } catch (error) {
        toast.error('Error fetching courses'+error.message);
      }
    },

    async listInstances() {
      try {
        const response = await axios.get(`http://localhost:8080/api/instances/${this.selectedYear}/${this.selectedSemester}`);
        this.instances = response.data;
      } catch (error) {
        toast.error('Error fetching course instances'+error.message);
      }
    },

    async addCourse() {
      try {
        const response = await axios.post('http://localhost:8080/api/courses', {
          title: this.courseTitle,
          courseCode: this.courseCode,
          description: this.courseDescription,
        });
        this.courses.push(response.data);
        this.courseTitle = '';
        this.courseCode = '';
        this.courseDescription = '';
        toast.success('Course added successfully');
      } catch (error) {
        toast.error('Error adding course'+error.message);
      }
    },

    async addInstance() {
      try {
        await axios.post('http://localhost:8080/api/instances', {
          courseId: this.selectedCourseId,
          year: this.year,
          semester: this.semester,
        });
        this.selectedCourseId = '';
        this.year = '';
        this.semester = '';
        toast.success('Course instance added successfully');
      } catch (error) {
        toast.error('Error adding course instance'+error.message);
      }
    },

    async deleteCourse(id) {
      try {
        await axios.delete(`http://localhost:8080/api/courses/${id}`);
        this.courses = this.courses.filter(course => course.courseId !== id);
        toast.success('Course deleted successfully');
      } catch (error) {
        toast.error('Error deleting course'+error.message);
      }
    },

    async deleteInstance(id) {
      try {
        await axios.delete(`http://localhost:8080/api/instances/${id}`);
        this.instances = this.instances.filter(instance => instance.courseInstanceId !== id);
        toast.success('Course instance deleted successfully');
      } catch (error) {
        toast.error('Error deleting course instance' +error.message);
      }
    },

    goToCourseDetails(courseId) {
      this.$router.push({name: 'CourseDetails', params: {id: courseId}});
    },

    goToInstanceDetails(instanceId) {
      console.log("called ")
      this.$router.push({name: 'InstanceDetails', params: {id: instanceId}});
    },

    getInstanceCourseTitle(courseId) {
      const course = this.courses.find(course => course.courseId === courseId);
      return course ? course.title : '';
    },

    getInstanceCourseCode(courseId) {
      const course = this.courses.find(course => course.courseId === courseId);
      return course ? course.courseCode : '';
    }
  },


  mounted() {
    this.listCourses();
  },
};
</script>
