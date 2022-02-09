<template>
  <div>
    <div class="ticket">
      <div class="qrcode">
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://events254.co.ke/tickets/${ticket.ticketId}`"
          alt="QR Code"
        >
      </div>

      <div class="order-number">
        <p>Order Number: #EVT254{{ ticket.ticketId }}</p>
        <p>{{ ticket.eventName }}</p>
      </div>
      <div class="ticket-title">
        <p>Ticket type: {{ ticket.ticketType }}</p>
      </div>
      <div class="ticket-price">
        <p>
          Price:

          {{ ticketTotal }}
        </p>
      </div>
      <div class="ticket-location">
        <p>Location: {{ ticket.eventLocation }}</p>
      </div>
      <div v-if="ticket.organiser" class="ticket-organiser">
        <p>
          Organiser:
          {{ ticket.organiser.name }}
        </p>
      </div>
      <div v-else>
        <p>Organiser: Events254</p>
      </div>
      <div class="ticket-date">
        <p>Starting: {{ $moment(ticket.eventDate).format("lll") }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Ticket',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  computed: {
    ticketTotal () {
      const price = this.ticket.ticketPrice
      const total = price * this.ticket.ticketCount
      const currency = 'KES'

      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(total)
    }
  }
}
</script>

<style lang="scss" scoped>
.ticket {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 1fr 2fr
  1fr;
}
</style>
