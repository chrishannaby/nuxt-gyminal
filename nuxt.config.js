import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createSitemapRoutes = async () => {
  const { $content } = require("@nuxt/content");
  const products = await $content("products").fetch();
  return products.map((p) => `products/${p.slug}`);
};

export default {
  target: "static",
  build: {
    filenames: {
      app: ({ isModern }) => `[name]${isModern ? ".modern" : ""}.js`,
      chunk: ({ isModern }) => `[name]${isModern ? ".modern" : ""}.js`,
      css: () => "[name].css",
      img: () => "[path][name].[ext]",
      font: () => "[path][name].[ext]",
      video: () => "[path][name].[ext]",
    },
    extend(config) {
      // Remove hash from url-loader
      config.module.rules
        .filter(function(module) {
          return module.loader === "url-loader";
        })
        .forEach((module) => {
          const { options } = module;
          options.name = options.name.replace(".[hash:7]", "");
        });
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Gyminal",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  components: true,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#E21937" },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [`~/plugins/currency-filter.js`],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxt/content", "@nuxtjs/sitemap"],
  content: {
    // Options
  },
  sitemap: {
    hostname: "https://lifefitness.netlify.app",
    gzip: true,
    routes: createSitemapRoutes,
  },
  /*
   ** Build configuration
   */
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  hooks: {
    build: {
      async done(builder) {
        const { $content } = require("@nuxt/content");
        const products = await $content("products")
          .only(["name", "id", "price"])
          .fetch();
        const buffer = Buffer.from(JSON.stringify(products)).toString("base64");
        const dataUri = "data:application/json;base64," + buffer;
        cloudinary.v2.uploader.upload(dataUri, {
          resource_type: "raw",
          public_id: "lifefitness/products.json",
          overwrite: true,
        });
      },
    },
  },
  googleFonts: {
    families: {
      Inter: {
        wght: [100 + ".." + 900],
      },
    },
  },
  tailwindcss: {
    jit: true,
  },
};
