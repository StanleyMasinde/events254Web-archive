<template>
  <div>
    <client-only>
      <AppBar title="Events254" :back="false" />
    </client-only>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(faq, i) in faqs" :key="i">
              <v-expansion-panel-header>
                {{ faq.question }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ faq.answer }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      faqs: [
        {
          question: 'What is Events254?',
          answer: 'Events254 is a social network for people to connect with each other and share their events, groups, and interests.'
        },
        {
          question: 'Is Events254 free?',
          answer: 'Yes, Events254 is free to use. However, you can only create an account if you are 18 years of age or older.'
        },
        {
          question: 'Can anyone sell tickets to events?',
          answer: 'No, you can only sell tickets to events you create. You also need to be verified to sell tickets.'
        },
        {
          question: 'How do I sign up?',
          answer: 'You can sign up for an account by clicking the sign up button on the home page.'
        },
        {
          question: 'How do I login?',
          answer: 'You can login by clicking the login button on the home page.'
        },
        {
          question: 'How do I logout?',
          answer: 'You can logout by clicking the logout button on the home page.'
        },
        {
          question: 'How do I create an event?',
          answer: 'You can create an event by clicking the create event button on the home page.'
        },
        {
          question: 'How do I create a group?',
          answer: 'You can create a group by clicking the create group button on the home page.'
        },
        {
          question: 'How do I create a profile?',
          answer: 'You can create a profile by clicking the create profile button on the home page.'
        },
        {
          question: 'How do I edit my profile?',
          answer: 'You can edit your profile by clicking the edit profile button on the home page.'
        },
        {
          question: 'How do I edit my event?',
          answer: 'You can edit your event by clicking the edit event button on the home page.'
        },
        {
          question: 'How do I edit my group?',
          answer: 'You can edit your group by clicking the edit group button on the home page.'
        },
        {
          question: 'How do I delete my event?',
          answer: 'You can delete your event by clicking the delete event button on the home page.'
        },
        {
          question: 'How do I delete my group?',
          answer: 'You can delete your group by clicking the delete group button on the home page.'
        },
        {
          question: 'How do I delete my profile?',
          answer: 'Email us at info@events254.co.ke with the subject "Delete Account" and we will delete the acoount associated with your email.'
        },
        {
          question: 'who has access to my data?',
          answer: 'We do not share your data with anyone. We only use your data to provide you with the best experience possible. You can read more from our privacy policy.'
        }
      ]
    }
  },
  head () {
    return {
      title: 'Frequently Asked Questions',
      meta: [
        {
          hid: 'desription',
          name: 'description',
          content: 'Frequently asked questions about Events254'
        }
      ]
    }
  }
}
</script>
