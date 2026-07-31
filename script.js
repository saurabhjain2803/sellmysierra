const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

galleryImages.forEach(img => {
    img.addEventListener("click", function (e) {
        e.preventDefault();
        lightboxImg.src = this.src;
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});
function closeLightbox(){
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = "";
}
closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
    if(e.target === lightbox){
        closeLightbox();
    }
});

document.addEventListener("keydown", e => {
    if(e.key === "Escape"){
        closeLightbox();
    }
});