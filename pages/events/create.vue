<template>
    <section class="px-3">
        <div class=" h-[94vh] flex flex-col justify-center">
            <!--Step one-->
            <div v-show="currentStep == 1" class="text-center">
                <div class="mb-4">
                    <h1 class=" font-bold text-xl">Select your event type</h1>
                </div>

                <div class="px-12">
                    <div :class="{
                        'bg-primary text-white border-primary border-2': eventTypeMeta.attendanceMode === 'inPerson'
                    }" @click="eventTypeMeta.attendanceMode = 'inPerson'"
                        class="transition-all delay-150 duration-300 py-2 border rounded-xl cursor-grab hover:bg-primary hover:text-white hover:border-primary">
                        <h1 class=" font-bold">In person</h1>
                        <small class=" text-xs">
                            Has a physical location e.g. a conference
                        </small>
                    </div>
                    <div :class="{
                        'bg-primary text-white border-primary border-2': eventTypeMeta.attendanceMode === 'virtual'
                    }" @click="eventTypeMeta.attendanceMode = 'virtual'"
                        class="transition-all delay-150 duration-300 mt-3 py-2 border rounded-xl cursor-grab hover:bg-primary hover:text-white hover:border-primary">
                        <h1>Virtual</h1>
                        <small>
                            Events that happen online e.g. Webinars
                        </small>
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
                    <h1 class=" font-bold text-xl">Add your event details</h1>
                </div>

                <div>
                    <form action="#" method="POST">
                        <label for="about">
                            <h1>Give your event a title<span class=" text-red-600">*</span></h1>
                            <input autofocus class="w-full rounded-lg focus:ring-primary focus:border-primary"
                                type="text" name="about" id="about" placeholder="Movies and cookies">
                        </label>

                        <label for="shortDesc">
                            <h1 class="mt-4">Something short and catchy about your event<span
                                    class=" text-red-600">*</span></h1>
                            <textarea maxlength="120" placeholder="Something catchy" name="short_description"
                                id="shortDesc" class=" w-full rounded-lg"></textarea>
                        </label>

                        <label v-if="eventTypeMeta.attendanceMode === 'inPerson'" for="location">
                            <h1>Enter the event's location<span class="mt-4 text-red-600">*</span></h1>
                            <input autofocus class="w-full rounded-lg focus:ring-primary focus:border-primary"
                                type="text" name="location" id="location" placeholder="Kicc grounds">
                        </label>

                        <label v-else for="location">
                            <h1>Add the event's url here</h1>
                            <input autofocus class="w-full rounded-lg focus:ring-primary focus:border-primary"
                                type="text" name="location" id="location" placeholder="https://myonline-link.com">
                        </label>

                        <label for="desc">
                            <h1 class="mt-4">Add details about your event</h1>
                            <textarea placeholder="Give as much info as possible" name="description" id="desc"
                                class="w-full rounded-lg"></textarea>
                        </label>
                    </form>
                </div>

                <div class="flex justify-between">
                    <div>
                        <!--Button to go to the next step-->
                        <button @click="currentStep = 1" v-show="eventTypeMeta.attendanceMode !== ''"
                            class="flex mt-5 border border-gray-700 text-gray-700 rounded-lg px-4 py-3">
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
                    <h1 class=" font-bold text-xl">Add your event dates</h1>
                </div>

                <form action="#" method="POST">
                    <label for="isAllDay" class="flex justify-between">
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h1>Is all-day</h1>
                        </div>

                        <div>
                            <input type="checkbox" v-model="eventTypeMeta.isAllDay" class=" rounded-lg h-5 w-5"
                                name="isAllDay" id="isAllDay">
                        </div>
                    </label>

                    <div class="grid grid-cols-5 grid-rows-3 mt-5">
                        <div class="col-span-2">
                            <input class="w-full rounded-lg" type="date">
                        </div>
                        <div :class="{ 'row-span-3': !eventTypeMeta.isAllDay }"
                            class="flex flex-col justify-center align-middle">
                            <div class="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <div class="col-span-2">
                            <input class="w-full rounded-lg" type="date">
                        </div>
                        <!--Empty rows-->
                        <div class="col-span-2"></div>
                        <div class="col-span-2"></div>
                        <!--/empty rows-->
                        <div v-if="!eventTypeMeta.isAllDay" class="col-span-2">
                            <input class="w-full rounded-lg" type="time">
                        </div>
                        <div v-if="!eventTypeMeta.isAllDay" class="col-span-2">
                            <input class="w-full rounded-lg" type="time">
                        </div>
                    </div>
                </form>


                <div class="flex justify-between">
                    <div>
                        <!--Button to go to the next step-->
                        <button @click="currentStep = 2"
                            class="flex mt-5 border border-gray-700 text-gray-700 rounded-lg px-4 py-3">
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
            <img class="rounded-lg mb-4 w-full h-80 object-contain" :src="posterUrl" alt="Current poster">
                <div class="mb-4">
                    <h1 class=" font-bold text-xl">Add your poster</h1>
                </div>

                <form action="#" method="POST">
                    <label for="poster">
                        <div @click="triggerPosterPicker"
                            class="h-28 w-full border-2 rounded-lg z-10 flex flex-col justify-center text-center bg-gray-300 border-dashed">
                            <div>
                                <h1 class=" font-bold">Upload your poster</h1>
                                <p>Click here to upload</p>
                                <input @change="onPosterChange" class="w-full hidden rounded-lg focus:ring-primary focus:border-primary"
                                    type="file" accept="image/*" name="about" id="posterInput">
                            </div>
                        </div>
                    </label>
                </form>


                <div class="flex justify-between">
                    <div>
                        <!--Button to go to the next step-->
                        <button @click="currentStep = 2"
                            class="flex w-full mt-5 border border-gray-700 text-gray-700 rounded-lg px-4 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Dates
                        </button>
                        <!--/Button to go to the next step-->
                    </div>

                    <!--Button to go to the next step-->
                    <button class="flex mt-5 bg-primary text-white rounded-lg px-4 py-3">
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
        </div>
    </section>
</template>

<script setup>
import { reactive, ref } from 'vue';

definePageMeta({
    layout: 'createevent',
})

const eventTypeMeta = reactive({
    attendanceMode: '',
    isAllDay: false,
    isRecurring: false,
    isPublic: true,
    hasEndDate: false,
    hasAgenda: false,
    hasMeetupPlace: false,
    hasTickets: false,
})

const currentStep = ref(1)
const posterUrl = ref('/hero.jpg')


const event = reactive({
    about: '',
    shortDesription: '',
    location: '',
    onlineUrl: '',
    startDate: new Date()
})

const triggerPosterPicker = () => {
    const picker = document.querySelector('#posterInput')
    picker.click()
}

const onPosterChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0])
    posterUrl.value = url
}

</script>