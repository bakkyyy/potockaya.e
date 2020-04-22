<template lang="pug">
    footer
     .nav-footer
        .phone-footer
          | Потоцкая Екатерина +7 (999) 999-99-99
        .empty
        .read-please.button-footer
          router-link(to="/read" class ='link-footer')
            p.plink Информация для заказа
        .empty
        .instagram.button-footer
          a.link-footer(href='https://www.instagram.com/potockaya.e/' target='_blank')
            img.img-footer.inst(src="@/assets/instagram.png")
            p.plink  Инстаграм
        .vk.button-footer
          a.link-footer(href='https://vk.com/id117721065' target='_blank')
            img.img-footer.vkk(src="@/assets/vk.png")
            p.plink Вконтакте
</template>
<script>
import "@/styles/footer.css";
export default {};
</script>