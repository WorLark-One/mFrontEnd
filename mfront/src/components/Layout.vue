<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      flat
      elevate-on-scroll
      color="primary"
      dark
      v-if="this.$store.state.layout"
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title>
        <a
          href="/"
          class="white--text"
          style="text-decoration: none; font-family: montserrat"
          ><font-awesome-icon
            icon="shopping-basket"
            size="2x"
            class="hidden-sm-and-down"
          />&nbsp; KMaule</a
        >
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model="producto"
        flat
        solo-inverted
        hide-details
        label="Buscar producto"
        class="hidden-sm-and-down"
      />
      <v-select
        v-model="comuna"
        style="width: 25px"
        :items="items"
        item-text="nombre"
        item-value="nombre"
        label="Comuna"
        flat
        solo-inverted
        hide-details
        class="hidden-sm-and-down pl-2"
      ></v-select>
      <v-btn
        class="ml-1"
        color="hidden-sm-and-down cbtn"
        solo-inverted
        fab
        small
        elevation="0"
        @click="goToSearch()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer />

      <v-menu
        open-on-click
        :close-on-content-click="false"
        bottom
        offset-y
        rounded
        :max-height="400"
        :min-width="300"
        :max-width="300"
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol == 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click.prevent="notificacionesLeidas()"
          >
            <v-badge
              :content="contadorNotificaciones"
              :value="contadorNotificaciones"
              color="green"
              overlap
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list color="white">
          <v-subheader><strong>Notificaciones</strong></v-subheader>
          <template v-for="(item, index) in itemss">
            <v-list-item v-if="itemss.length > 0" :key="index">
              <v-list-item-content>
                <v-list-item-title
                  ><a
                    @click="goToProduct(item.producto_id)"
                    style="text-decoration: none"
                    ><span style="font-size: 100%">{{
                      item.nombre_producto
                    }}</span></a
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="mt-2"
                  >${{ formatPrecio(item.precio_producto) }}
                  <strong
                    class="ml-1 pl-1 pr-1 cbtn rounded"
                    style="
                      font-size: 0.9em;
                      color: #ffff;
                      font-family: montserrat;
                    "
                    >-{{ item.descuento_producto }}%
                  </strong>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn
                icon
                small
                text
                color="danger"
                @click.prevent="eliminarNotificacion(item.id)"
                >X</v-btn
              >
            </v-list-item>
            <v-divider
              v-if="itemss.length > 0"
              :key="index"
              class="mx-4"
            ></v-divider>
          </template>
          <template v-if="itemss.length == 0">
            <v-list-item :key="0">
              <v-list-item-content>
                <v-list-item-subtitle>
                  Usted no tiene notificaciones
                  disponibles.</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-dialog
        v-model="dialogCart"
        max-width="700px"
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol == 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-badge
              :content="productosCarritoFinal.length"
              :value="productosCarritoFinal.length"
              color="green"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card class="pl-0 ml-0">
          <v-stepper v-model="e1" color="cbtn">
            <v-stepper-header>
              <v-stepper-step color="cbtn" :complete="e1 > 1" step="1">
                Productos
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step color="cbtn" :complete="e1 > 2" step="2">
                Condiciones y envío
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items color="cbtn">
              <v-stepper-content step="1" color="cbtn" class="pl-0 pr-0">
                <v-card
                  v-scroll.self="onScroll"
                  class="overflow-y-auto pl-0 pr-0"
                  height="500"
                  elevation="0"
                  v-if="productosCarritoFinal.length == 0 ? true : false"
                >
                  <div align-self="center">
                    <p class="mx-10 my-12">
                      Usted actualmente no tiene productos añadidos a su carrito
                      de compra.
                    </p>
                  </div>
                </v-card>
                <v-card
                  v-scroll.self="onScroll"
                  class="overflow-y-auto pl-0 pr-0"
                  height="500"
                  elevation="0"
                  v-if="productosCarritoFinal.length == 0 ? false : true"
                >
                  <v-card
                    class=""
                    color="fondo lighten-4"
                    elevation="0"
                    height="120"
                    v-for="pro in productosCarritoFinal"
                    :key="pro.link"
                  >
                    <v-row class="px-0 mx-0">
                      <v-col
                        cols="2"
                        sm="2"
                        md="2"
                        align-self="center"
                        justify="center"
                      >
                        <v-img contain class="rounded-sm" :src="pro.imagen">
                        </v-img>
                      </v-col>
                      <v-col cols="9" sm="9" md="9" class="px-0 mx-0">
                        <v-card-text class="text--primary">
                          <div>
                            <a
                              :style="
                                $vuetify.breakpoint.smAndDown == true
                                  ? 'text-decoration: none; font-size: medium'
                                  : 'text-decoration: none; font-size: large'
                              "
                              ><span
                                class="d-inline-block text-truncate"
                                style="max-width: 100%"
                                >{{ pro.titulo }}</span
                              ></a
                            >
                          </div>
                          <v-row class="mt-3 mx-0 px-0">
                            <span
                              class="pt-1"
                              :style="
                                $vuetify.breakpoint.smAndDown == true
                                  ? 'font-size: 100%'
                                  : 'font-size: 150%'
                              "
                              v-if="pro.precio != 0"
                              ><strong
                                >$ {{ formatPrecio(pro.precio) }}</strong
                              ></span
                            >
                            <span style="font-size: 100%" v-if="pro.precio == 0"
                              ><strong>CONSULTAR</strong></span
                            >
                            <!--<v-spacer></v-spacer>-->
                            <div class="ml-4">
                              <v-btn
                                small
                                text
                                color="secondary"
                                @click.prevent="deleteProductCart(pro.id)"
                              >
                                <strong style="font-size: 150%"> - </strong>
                              </v-btn>
                              <v-btn disabled small text @click.prevent="">
                                <strong style="font-size: 120%">
                                  {{ pro.cantidad }}
                                </strong>
                              </v-btn>
                              <v-btn
                                small
                                text
                                color="secondary"
                                @click.prevent="postProductoCart(pro.id)"
                              >
                                <strong style="font-size: 150%"> + </strong>
                              </v-btn>
                            </div>
                          </v-row>
                        </v-card-text>
                      </v-col>
                      <v-col
                        cols="1"
                        sm="1"
                        md="1"
                        align-self="center"
                        justify="left"
                        class="px-0 mx-0"
                      >
                        <v-btn
                          icon
                          text
                          color="danger"
                          @click.prevent="deleteProductCartRaiz(pro.id)"
                          >X</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
                <div class="text-right mr-4 mt-6">
                  <v-btn dark color="cbtn" @click="e1 = 2"> Siguiente </v-btn>
                </div>
              </v-stepper-content>

              <v-stepper-content step="2" class="pl-0 pr-0">
                <v-card
                  v-scroll.self="onScroll"
                  class="overflow-y-auto pl-0 pr-0"
                  height="500"
                  elevation="0"
                >
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Veniam sint ad unde ipsam quam id voluptas error excepturi
                    dignissimos? Quisquam iste magnam odit velit eius ea aliquam
                    recusandae provident quo!
                  </p>
                </v-card>
                <div class="text-right mr-4 mt-6">
                  <v-btn text dark color="cbtn" @click="e1 = 1" class="mr-1">
                    Atrás
                  </v-btn>
                  <v-btn dark color="cbtn" @click="e1 = 1"> Finalizar </v-btn>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-dialog>
      <v-btn
        text
        elevation="0"
        :to="{ path: '/login' }"
        v-if="this.$store.state.auth == false"
      >
        <span>Iniciar sesión</span>
      </v-btn>
      <v-menu
        open-on-click
        bottom
        offset-y
        rounded
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol == 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.userName }}</span>
            <v-icon class="pl-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item key="1" :to="{ path: '/userProfile' }">
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item key="2" :to="{ path: '/userList' }">
            <v-list-item-title>Mi Lista</v-list-item-title>
          </v-list-item>
          <v-list-item key="3" :to="{ path: '/userRatings' }">
            <v-list-item-title>Mis Valoraciones</v-list-item-title>
          </v-list-item>
          <v-list-item key="4" :to="{ path: '/userPurchases' }">
            <v-list-item-title>Mis Compras</v-list-item-title>
          </v-list-item>
          <v-list-item key="5" link @click="logout()">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        open-on-click
        bottom
        offset-y
        v-if="
          this.$store.state.auth == true &&
          this.$store.state.userRol != 'cliente'
        "
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text elevation="0" v-bind="attrs" v-on="on">
            <span>{{ $store.state.userName }}</span>
            <v-icon class="ml-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="{ path: '/adminProfile' }">
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageComune' }">
            <v-list-item-content>
              <v-list-item-title>Gestionar comunas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageRegion' }">
            <v-list-item-content>
              <v-list-item-title>Gestionar regiones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageNotifications' }">
            <v-list-item-content>
              <v-list-item-title>Notificaciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ path: '/manageLogs' }">
            <v-list-item-content>
              <v-list-item-title>Logs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="logout()">
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!--<v-dialog
        v-model="dialog"
        width="500"
        :persistent="crearCuenta"
        v-if="this.$store.state.auth == false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn rounded text elevation="0" v-bind="attrs" v-on="on">
            <span>Iniciar sesión</span>
            <v-icon class="ml-1">mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            v-if="this.$store.state.auth == false && crearCuenta == false"
            class="text-h5 lighten-2"
          >
            Iniciar sesión en KMaule
          </v-card-title>
          <v-card-title
            v-if="this.$store.state.auth == false && crearCuenta == true"
            class="text-h5 lighten-2"
          >
            <v-btn
              icon
              class="mr-1"
              color="primary"
              @click="crearCuenta = false"
            >
              <font-awesome-icon icon="arrow-left" size="2x" />
            </v-btn>
            Crear cuenta en KMaule
          </v-card-title>
          <v-card-title
            v-if="this.$store.state.auth == true"
            class="text-h5 lighten-2"
          >
            Cerrar sesión en KMaule
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-form
            class="mx-6 mt-6"
            @submit.prevent="
              login(form);
              dialog = false;
            "
            v-if="this.$store.state.auth == false && crearCuenta == false"
          >
            <v-text-field
              v-model="form.email"
              label="Correo electrónico"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
              required
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn color="secondary" large block type="submit">
              Iniciar sesión
            </v-btn>
          </v-form>
          <v-form
            class="mx-6 mt-6"
            @submit.prevent="crearCuentaMethod()"
            v-if="this.$store.state.auth == false && crearCuenta == true"
          >
            <v-text-field
              v-model="form2.name"
              label="Nombre de usuario"
              required
            ></v-text-field>
            <v-text-field
              v-model="form2.email"
              label="Correo electrónico"
              required
            ></v-text-field>
            <v-text-field
              v-model="form2.password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Al menos 8 caracteres"
              required
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-text-field
              v-model="form2.passwordConfirm"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              name="input-10-1"
              label="Confirmar contraseña"
              hint="Al menos 8 caracteres"
              :rules="[
                (v) =>
                  v == this.form2.password ||
                  'Debe ser igual que la contraseña',
              ]"
              required
              @click:append="show3 = !show3"
            ></v-text-field>
            <v-btn color="secondary" large block type="submit">
              Crear Cuenta
            </v-btn>
          </v-form>
          <v-card-actions
            v-if="this.$store.state.auth == false && crearCuenta == true"
            class="mt-4 pb-4"
          >
          </v-card-actions>
          <v-card-actions
            v-if="this.$store.state.auth == false && crearCuenta == false"
            class="mt-4 pb-4"
          >
            <v-row>
              <v-col cols="12" align="center">
                <a>¿Olvidaste tu contraseña?</a>
              </v-col>
              <v-col cols="12" align="center">
                <v-divider></v-divider>
                <v-btn
                  class="mt-4"
                  color="primary"
                  small
                  @click="goToCrearCuenta"
                >
                  Crear una cuenta</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
          <div class="pt-6 pb-6 px-6" v-if="this.$store.state.auth == true">
            <v-btn color="secondary" block @click="dialog = false"
              >Logout</v-btn
            >
          </div>
        </v-card>
      </v-dialog>-->
    </v-app-bar>

    <!--<v-content
      id="1"
      v-if="
        this.$vuetify.breakpoint.smAndDown == true && this.$store.state.layout
      "
      :style="
        this.$vuetify.breakpoint.smAndDown == true ? 'margin-bottom: -56px' : ''
      "
      ><searchglobal
    /></v-content>-->
    <v-content id="2">
      <searchglobal
        v-if="
          this.$vuetify.breakpoint.smAndDown == true && this.$store.state.layout
        "
      />

      <router-view />
    </v-content>

    <v-footer :padless="true" v-if="this.$store.state.layout">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text class="white--text">
          <strong> Felipe Milla - {{ new Date().getFullYear() }} </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapActions, mapState } from "vuex";
import searchglobal from "./Global/SearchGlobal.vue";
//import Echo from "laravel-echo";
import axios from "axios";
import Pusher from "pusher-js";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
//window.Pusher = require("pusher-js");
//Pusher.logToConsole = true;
export default {
  components: {
    searchglobal,
  },
  data() {
    return {
      dialogCart: false,
      notifyCount: 0,
      contadorNotificaciones: 0,
      contadorProductosCarrito: 1,
      notifications: [],
      crearCuenta: false,
      show1: false,
      show2: false,
      show3: false,
      dialog: false,
      itemss: [],
      items: [
        "Todas",
        "Cauquenes",
        "Chanco",
        "Pelluhue",
        "Curicó",
        "Haulañé",
        "Licantén",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquén",
        "Colbún",
        "Linares",
        "Longaví",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas",
        "Constitución",
        "Curepto",
        "Empedrado",
        "Maule",
        "Pelarco",
        "Pencahue",
        "Río Claro",
        "San Clemente",
        "San Rafael",
        "Talca",
      ],
      activeBtn: 0,
      comuna: "",
      producto: "",
      orientacion: "ASC",
      marketPlaces: "ComunidadC+marketmaule+MercadoLibre",
      rangoPrecios: "Todos",
      valoracionProductos: "0",
      pagina: 1,
      form: {
        email: "admin@styde.net",
        password: "secret",
      },
      form2: {
        name: "asd",
        email: "asd@gmail.com",
        password: "asdasdasd",
        passwordConfirm: "asdasdasd",
        rol: "",
      },
      e1: 1,
      productosCarrito: [
        {
          id: 1,
          titulo:
            "Huaso Erasmo Pais 2020 asdasasdasd asd asdasdasd as dasdas aasdasda asdasdasda asd as asd asdas as dasdasdasa asd asdasdas asdasdasdasasdf",
          descripcion:
            "<div><br></div><div>Glorioso viñedo de Viejas parras maulinas,</div><div>testigo de mas de 150 años de historia.</div><div>Hoy consagramos al pipeño pais,</div><div>Como el vino Huaso de esta zona.</div><div>Vino tinto rojito color de pechuga loica,</div><div>Amistoso y querido como un pariente familiar</div><div>Hoy en nuestra mesa chilena, esta listo para celebrar</div><div>Celebrando ya están el Conde italiano y Huasopazo maulino, </div><div>al homenaje del campo chileno y a todos nuestros amigos…Salud</div><div> </div><div>Francesco Marone Cinzano - Cesar Huasopazo</div>",
          precio: 9720,
          imagen:
            "https://www.marketmaule.cl/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanBBIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5813db8ba5387e28c3e831d0b1c1c287bef0a5af/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VWTI5dFltbHVaVjl2Y0hScGIyNXpld2c2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWl3QmFRSXNBVG9NWjNKaGRtbDBlVWtpQzBObGJuUmxjZ1k2QmtWVU9ndGxlSFJsYm5SSklnd3pNREI0TXpBd0Jqc0lWQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e2dbe50542ebcaba8a130f4c07466db74adc28df/IMG_6069.jpg",
          ubicacion: "San Javier",
          link: "https://www.marketmaule.cl/products/vino-huaso-erasmo",
          marketplace: "marketmaule",
          cantidadValoraciones: 1,
          descuento: 10,
          valoracion: 5,
        },
        {
          id: 2,
          titulo: "Huaso Erasmo Pais 2020",
          descripcion:
            "<div><br></div><div>Glorioso viñedo de Viejas parras maulinas,</div><div>testigo de mas de 150 años de historia.</div><div>Hoy consagramos al pipeño pais,</div><div>Como el vino Huaso de esta zona.</div><div>Vino tinto rojito color de pechuga loica,</div><div>Amistoso y querido como un pariente familiar</div><div>Hoy en nuestra mesa chilena, esta listo para celebrar</div><div>Celebrando ya están el Conde italiano y Huasopazo maulino, </div><div>al homenaje del campo chileno y a todos nuestros amigos…Salud</div><div> </div><div>Francesco Marone Cinzano - Cesar Huasopazo</div>",
          precio: 9720,
          imagen:
            "https://www.marketmaule.cl/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanBBIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5813db8ba5387e28c3e831d0b1c1c287bef0a5af/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9VWTI5dFltbHVaVjl2Y0hScGIyNXpld2c2RTNKbGMybDZaVjkwYjE5bWFXeHNXd2RwQWl3QmFRSXNBVG9NWjNKaGRtbDBlVWtpQzBObGJuUmxjZ1k2QmtWVU9ndGxlSFJsYm5SSklnd3pNREI0TXpBd0Jqc0lWQT09IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--e2dbe50542ebcaba8a130f4c07466db74adc28df/IMG_6069.jpg",
          ubicacion: "San Javier",
          link: "https://www.marketmaule.cl/products/vino-huaso-erasmo",
          marketplace: "marketmaule",
          cantidadValoraciones: 1,
          descuento: 10,
          valoracion: 5,
        },
      ],
    };
  },
  async mounted() {
    /*window.Pusher = require("pusher-js");
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "0c40fe59ad95d8de38f8",
      cluster: "mt1",
      forceTLS: true,
    });
    window.Echo.channel("notificationUser").listen("hola", (e) => {
      console.log(e);
      //this.auxNotificacion(data);
    });*/
    await this.obtenerComunas();
    await this.getUser();
    await this.fun();
    await this.obtenerNotificaciones();
    await this.setComunas();
  },
  created() {
    //this.getNotifications();
  },
  computed: {
    ...mapState(["productosCarritoFinal"]),
  },
  mutations: {},
  methods: {
    ...mapActions([
      "SET_RUTAACTUAL",
      "login",
      "logout",
      "register",
      "getUser",
      "obtenerComunas",
      "postProductoCarrito",
      "deleteProductCarrito",
      "deleteProductCarritoRaiz",
    ]),
    fun() {
      var pusher = new Pusher("0c40fe59ad95d8de38f8", {
        cluster: "mt1",
      });
      //console.log(pusher);
      var channel = pusher.subscribe("notificationUser");

      /*eslint no-undef: 0*/
      var aux = "App\\Events\\DescuentoUser";
      var handler = function (data) {
        this.auxNotificacion(data);
      };
      var context = this;
      channel.bind(aux, handler, context);
    },
    setComunas() {
      this.items = this.$store.state.comunas;
    },
    goToProduct(id) {
      this.$router.push(`/product/${id}/search=${false}`);
    },
    formatPrecio(n) {
      n = n.toString();
      var flag = 0;
      while (flag == 0) {
        var n2 = n.replace(/(\d)(\d{3})($|,|\.)/g, "$1.$2$3");
        if (n == n2) {
          flag = 1;
        } else {
          n = n2;
        }
      }
      return n;
    },
    auxNotificacion(data) {
      if (this.$store.state.userId == data.user_id) {
        console.log("es el mismo usuario");
        this.obtenerNotificaciones();
      }
    },
    obtenerNotificaciones() {
      if (
        this.$store.state.auth == true &&
        this.$store.state.userRol == "cliente"
      ) {
        axios
          .get(`/api/private/getNotificationUser/${this.$store.state.userId}`)
          .then((result) => {
            console.log(result.data);
            this.itemss = result.data.data;
            this.contadorNotificaciones = result.data.count;
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
    async notificacionesLeidas() {
      if (this.contadorNotificaciones > 0) {
        await axios
          .put(`/api/private/markReadNotificacion/${this.$store.state.userId}`)
          .then((result) => {
            console.log(result.data);
            this.contadorNotificaciones = 0;
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },

    async eliminarNotificacion(id) {
      await axios
        .delete(
          `/api/private/deleteNotificacion/${id}/${this.$store.state.userId}`
        )
        .then((result) => {
          console.log(result.data);
          this.contadorNotificaciones = 0;
        })
        .catch((er) => {
          console.log(er);
        });
      await this.obtenerNotificaciones();
    },

    goToCrearCuenta() {
      this.crearCuenta = true;
      this.form2 = {
        name: "asd",
        email: "asd@gmail.com",
        password: "asdasdasd",
        passwordConfirm: "asdasdasd",
        rol: "",
      };
      this.show2 = false;
      this.show3 = false;
    },
    async getNotifications() {
      await axios
        .get(`/api/private/getNotificationUser`)
        .then((result) => {
          console.log(result.data);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    async crearCuentaMethod() {
      if (this.form2.password == this.form2.passwordConfirm) {
        let newUser = {
          name: this.form2.name,
          email: this.form2.email,

          password: this.form2.password,

          rol: this.$store.state.newUser,
        };
        console.log(newUser);
        await this.register(newUser);
        this.dialog = false;
      } else {
        console.log("verificar");
        this.dialog = false;
      }
      this.resetCrearCuenta();
    },
    resetCrearCuenta() {
      this.crearCuenta = false;
      this.form2 = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        rol: "",
      };
      this.show2 = false;
      this.show3 = false;
    },
    goToSearch() {
      if (this.producto != "" && this.producto != undefined) {
        var consulta = "";
        this.producto = this.producto.replace(" ", "%");
        if (this.comuna != "" && this.comuna != undefined) {
          consulta =
            "p=" +
            this.producto +
            "&c=" +
            this.comuna +
            "&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&val=" +
            this.valoracionProductos +
            "&pag=" +
            this.pagina;
        } else {
          consulta =
            "p=" +
            this.producto +
            "&c=Todas&ori=" +
            this.orientacion +
            "&mp=" +
            this.marketPlaces +
            "&rgp=" +
            this.rangoPrecios +
            "&val=" +
            this.valoracionProductos +
            "&pag=" +
            this.pagina;
        }
        const ruta = {
          name: "Search",
          params: {
            consulta: consulta,
          },
        };
        this.$store.commit("SET_RUTAACTUAL", consulta);
        this.producto = "";
        this.comuna = "";
        this.orientacion = "ASC";
        this.$router.push(ruta);
      }
    },
    onScroll() {
      this.scrollInvoked++;
    },
    eliminarProductoCarrito(idProducto) {
      console.log(idProducto);
    },
    async postProductoCart(idProducto) {
      let producto = {
        producto_id: parseInt(idProducto),
        usuario_id: this.$store.state.user.user.id,
      };
      this.postProductoCarrito(producto);
    },
    async deleteProductCart(idProducto) {
      let request = {
        producto_id: parseInt(idProducto),
        usuario_id: this.$store.state.user.user.id,
      };
      this.deleteProductCarrito(request);
    },
    async deleteProductCartRaiz(idProducto) {
      let request = {
        producto_id: parseInt(idProducto),
        usuario_id: this.$store.state.user.user.id,
      };
      this.deleteProductCarritoRaiz(request);
    },
  },
};
</script>

<style scoped>
</style>
