<template>
  <div id="app" style="display:none">
    <span id="ts-address-data"></span>
    <button id="ts-address" v-on:click="GetAddress()"></button>
    <span id="ts-seed-data"></span>
    <button id="ts-seed" v-on:click="GetSeed()"></button>

    <span id="ts-transaction-data"></span>
    <span id="ts-transaction-return"></span>
    <span id="ts-transaction-err"></span>
    <button id="ts-transaction" v-on:click="Transaction()"></button>

    <span id="ts-sign-data"></span>
    <span id="ts-sign-return"></span>
    <button id="ts-sign" v-on:click="Sign()"></button>
  </div>
</template>

<script src="./lib.js"></script>
