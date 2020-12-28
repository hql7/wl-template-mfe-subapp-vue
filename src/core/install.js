
import Vue from "vue";
import store from "@/store";

/**
 * @name 注册插件
 */
// import '@/plugins'

/**
 * @name 注册library
 */

import libraryInstall from "@/library/install"
libraryInstall(Vue, store);

/**
 * @name 注册样式
 */
import "@/library/css/install.scss"
import "@/assets/css/install.js"