<template>
  <section class="px-3">
    <div class="h-[94vh] flex flex-col justify-center">
      <!--Step one-->
      <div v-show="currentStep == 1" class="text-center">
        <div class="mb-4">
          <h1 class="font-bold text-xl">Select your event type</h1>
        </div>

        <div class="px-12">
          <div :class="{
            'bg-primary text-white border-primary border-2':
              eventTypeMeta.attendanceMode === 'inPerson',
          }" @click="eventTypeMeta.attendanceMode = 'inPerson'" class="
              transition-all
              delay-150
              duration-300
              py-2
              border
              rounded-xl
              cursor-grab
              hover:bg-primary hover:text-white hover:border-primary
            ">
            <h1 class="font-bold">In person</h1>
            <small class="text-xs">
              Has a physical location e.g. a conference
            </small>
          </div>
          <div :class="{
            'bg-primary text-white border-primary border-2':
              eventTypeMeta.attendanceMode === 'virtual',
          }" @click="eventTypeMeta.attendanceMode = 'virtual'" class="
              transition-all
              delay-150
              duration-300
              mt-3
              py-2
              border
              rounded-xl
              cursor-grab
              hover:bg-primary hover:text-white hover:border-primary
            ">
            <h1>Virtual</h1>
            <small> Events that happen online e.g. Webinars </small>
          </div>

          <!--Button to go to the next step-->
          <button @click="currentStep = 2" v-show="eventTypeMeta.attendanceMode !== ''"
            class="flex mt-5 bg-primary text-white rounded-lg px-4 py-3">
            Next step
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <!--/Button to go to the next step-->
        </div>
      </div>
      <!--/Step one-->

      <!--Step 2-->
      <div v-show="currentStep == 2" class="">
        <div class="mb-4">
          <h1 class="font-bold text-xl">Add your event details</h1>
        </div>

        <div>
          <form action="#" method="POST">
            <label for="about">
              <h1>
                Give your event a title<span class="text-red-600">*</span>
              </h1>
              <input v-model="event.about" autofocus class="
                  w-full
                  rounded-lg
                  focus:ring-primary focus:border-primary
                " type="text" name="about" id="about" placeholder="Movies and cookies" />
            </label>

            <label for="shortDesc">
              <h1 class="mt-4">
                Something short and catchy about your event<span class="text-red-600">*</span>
              </h1>
              <textarea v-model="event.shortDesription" maxlength="120" placeholder="Something catchy"
                name="short_description" id="shortDesc" class="w-full rounded-lg"></textarea>
            </label>

            <label for="categories">
              <select v-model="event.category_id" name="category_id" class="w-full mt-3 mb-3 rounded-lg"
                id="categories">
                <option value="">Select category</option>
                <option v-for="(c, i) in categories" :key="i" :value="c.id">
                  {{ c.name }}
                </option>
              </select>
            </label>

            <label v-if="eventTypeMeta.attendanceMode === 'inPerson'" for="location">
              <h1>
                Enter the event's location<span class="mt-4 text-red-600">*</span>
              </h1>
              <input v-model="event.location" autofocus class="
                  w-full
                  rounded-lg
                  focus:ring-primary focus:border-primary
                " type="text" name="location" id="location" placeholder="Kicc grounds" />
            </label>

            <label v-else for="location">
              <h1>Add the event's url here</h1>
              <input v-model="event.online_link" autofocus class="
                  w-full
                  rounded-lg
                  focus:ring-primary focus:border-primary
                " type="text" name="location" id="location" placeholder="https://myonline-link.com" />
            </label>

            <label for="desc">
              <h1 class="mt-4">Add details about your event</h1>
              <textarea v-model="event.description" placeholder="Give as much info as possible" name="description"
                id="desc" class="w-full rounded-lg"></textarea>
            </label>
          </form>
        </div>

        <div class="flex justify-between">
          <div>
            <!--Button to go to the next step-->
            <button @click="currentStep = 1" v-show="eventTypeMeta.attendanceMode !== ''" class="
                flex
                mt-5
                border border-gray-700
                text-gray-700
                rounded-lg
                px-4
                py-3
              ">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Event type
            </button>
            <!--/Button to go to the next step-->
          </div>

          <!--Button to go to the next step-->
          <button @click="currentStep = 3" v-show="eventTypeMeta.attendanceMode !== ''"
            class="flex mt-5 bg-primary text-white rounded-lg px-4 py-3">
            Add dates
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <!--/Button to go to the next step-->
        </div>
      </div>
      <!--Step 2-->

      <!--Step 3-->
      <div v-show="currentStep == 3" class="">
        <div class="mb-4">
          <h1 class="font-bold text-xl">Add your event dates</h1>
        </div>

        <form action="#" method="POST">
          <label for="isAllDay" class="flex justify-between">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1>Is all-day</h1>
            </div>

            <div>
              <input type="checkbox" v-model="eventTypeMeta.isAllDay" class="rounded-lg h-5 w-5" name="isAllDay"
                id="isAllDay" />
            </div>
          </label>

          <div class="grid grid-cols-5 grid-rows-3 mt-5">
            <div class="col-span-2">
              <input v-model="event.startDate" class="w-full rounded-lg" type="date" />
            </div>
            <div :class="{ 'row-span-3': !eventTypeMeta.isAllDay }" class="flex flex-col justify-center align-middle">
              <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            <div class="col-span-2">
              <input v-model="event.endDate" class="w-full rounded-lg" type="date" />
            </div>
            <!--Empty rows-->
            <div class="col-span-2"></div>
            <div class="col-span-2"></div>
            <!--/empty rows-->
            <div v-if="!eventTypeMeta.isAllDay" class="col-span-2">
              <input v-model="event.startTime" class="w-full rounded-lg" type="time" />
            </div>
            <div v-if="!eventTypeMeta.isAllDay" class="col-span-2">
              <input v-model="event.endTime" class="w-full rounded-lg" type="time" />
            </div>
          </div>
        </form>

        <div class="flex justify-between">
          <div>
            <!--Button to go to the next step-->
            <button @click="currentStep = 2" class="
                flex
                mt-5
                border border-gray-700
                text-gray-700
                rounded-lg
                px-4
                py-3
              ">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Event info
            </button>
            <!--/Button to go to the next step-->
          </div>

          <!--Button to go to the next step-->
          <button @click="currentStep = 4" class="flex mt-5 bg-primary text-white rounded-lg px-4 py-3">
            Poster
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <!--/Button to go to the next step-->
        </div>
      </div>
      <!--/Step 3-->

      <!--Step 4-->
      <div v-show="currentStep == 4">
        <img class="rounded-lg mb-4 w-full h-80 object-contain" :src="posterUrl" alt="Current poster" />
        <div class="mb-4">
          <h1 class="font-bold text-xl">Add your poster</h1>
        </div>

        <form action="#" id="imageForm" method="POST">
          <label for="poster">
            <div @click="triggerPosterPicker" class="
                h-28
                w-full
                border-2
                rounded-lg
                z-10
                flex flex-col
                justify-center
                text-center
                bg-gray-300
                border-dashed
              ">
              <div>
                <h1 class="font-bold">Upload your poster</h1>
                <p>Click here to upload</p>
                <input @change="onPosterChange" class="
                    w-full
                    hidden
                    rounded-lg
                    focus:ring-primary focus:border-primary
                  " type="file" accept="image/*" name="image" id="posterInput" />
              </div>
            </div>
          </label>
        </form>

        <div class="flex justify-between">
          <div>
            <!--Button to go to the next step-->
            <button @click="currentStep = 3" class="
                flex
                w-full
                mt-5
                border border-gray-700
                text-gray-700
                rounded-lg
                px-4
                py-3
              ">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Dates
            </button>
            <!--/Button to go to the next step-->
          </div>

          <!--Button to go to the next step-->
          <button @click="currentStep = 5" class="flex mt-5 bg-primary text-white rounded-lg px-4 py-3">
            Preview
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </button>
          <!--/Button to go to the next step-->
        </div>
      </div>
      <!--/Step 4-->

      <!--Step 5-->
      <div v-show="currentStep == 5">
        <!--Venue location info-->
        <div class="m-2 rounded-xl relative">
          <div class="bg-white border-2 absolute top-2 left-2 rounded-xl p-2">
            <!--if physical-->
            <div class="flex" v-if="event.location !== ''">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h1>{{ event.location }}</h1>
            </div>
            <!--/ If physical-->
            <!--if virtual-->
            <div class="flex" v-else>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h1>Virtual</h1>
            </div>
            <!--/ If virtual-->
          </div>
          <div class="border-2 rounded-xl">
            <img class="rounded-xl w-full" :src="posterUrl ? posterUrl : '/hero.jpg'" />
          </div>
          <div class="absolute w-full bottom-0 px-24 sm:px-64 text-center">
            <div class="
                bg-primary
                border-2
                text-white
                line-clamp-1
                rounded-xl
                p-1
                -mb-5
              ">
              <h1>{{ new Date(event.startDate).toDateString() }}</h1>
            </div>
          </div>
        </div>
        <!--/ Venue location info-->

        <!--Event info-->
        <div class="mx-2 my-5">
          <h1 class="text-2xl font-semibold line-clamp-1">{{ event.about }}</h1>
          <h1 class="text-lg">By: {{ event.organiser ?? "Events254" }}</h1>
        </div>
        <!--/ Event info-->

        <!--Event About-->
        <div class="mx-2 my-5">
          <h1 class="text-lg font-semibold line-clamp-1">About</h1>
          <p class="">{{ event.description }}</p>
        </div>

        <div>
          <!--Button to go to the next step-->
          <button @click="currentStep = 4" class="
              flex
              w-fit
              mt-5
              border border-gray-700
              text-gray-700
              rounded-lg
              px-4
              py-3
            ">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Poster
          </button>
          <!--/Button to go to the next step-->
        </div>

        <!--Create Button-->
        <div @click="createEvent" class="fixed left-0 bottom-1 w-screen px-1 sm:px-20">
          <button class="
              rounded-xl
              text-white
              bg-primary
              py-3
              w-full
              flex
              gap-1
              justify-center
              content-center
            ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <div class="">
              <h1 class="font-bold text-lg">Create event</h1>
            </div>
          </button>
        </div>
        <!--/Create Button-->
      </div>
      <!--/Step 5-->
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

definePageMeta({
  layout: "createevent",
  middleware: ["auth"],
});

const { $events254Api } = useNuxtApp();
const config = useRuntimeConfig();
const {
  data: categories,
  pending,
  error,
  refresh,
} = await useFetch(`${config.public.apiUrl}/categories`, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-API-KEY": config.public.apiKey,
  },
});

const eventTypeMeta = reactive({
  attendanceMode: "",
  isAllDay: false,
  isRecurring: false,
  isPublic: true,
  hasEndDate: false,
  hasAgenda: false,
  hasMeetupPlace: false,
  hasTickets: false,
});

const currentStep = ref(1);
const posterUrl = ref("/hero.jpg");

const event = reactive({
  about: "",
  shortDesription: "",
  description: "",
  category_id: "",
  startDate: "",
  startTime: "00:00",
  endDate: "",
  endTime: "",
  location: "",
  online_link: "",
});

const triggerPosterPicker = () => {
  const picker = document.querySelector("#posterInput");
  picker.click();
};

const onPosterChange = (e) => {
  const url = URL.createObjectURL(e.target.files[0]);
  posterUrl.value = url;
};

const { $axios } = useNuxtApp();
const $router = useRouter();
const createEvent = async () => {
  const formElement = document.querySelector("#imageForm");
  const newEventData = new FormData(formElement);
  newEventData.append("about", event.about);
  newEventData.append("short_description", event.shortDesription);
  newEventData.append("description", event.description);
  newEventData.append("category_id", event.category_id);
  newEventData.append("startDate", event.startDate);
  newEventData.append("startTime", event.startTime || "00:00");
  newEventData.append("endDate", event.endDate);
  newEventData.append("endTime", event.endTime);
  newEventData.append("location", event.location);
  newEventData.append("online_link", event.online_link);

  try {
    const { data } = await $events254Api.createEvent(
      event.about,
      event.description,
      event.startTime,
      event.startDate,
      event.category_id,
      newEventData.get("image"),
      event.location,
      event.online_link,
      event.endTime,
      event.endDate
    );
    $router.push(`/events/${data.id}/manage`);
  } catch (error) {
    console.log(error);
  }
};
</script>