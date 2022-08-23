<script lang="ts">
  import wheelchairIcon from "../static/wheelchair.png";
</script>

<div class="flex border-b-2 border-black border-opacity-10 my-3">
  <div class="row mt-2 mb-4 basis-1/2">
    <img
      alt=""
      class="image"
      style="filter: grayscale(100%)"
      src={wheelchairIcon}
    />
    <h3 class="text-xl font-base">Limited Wheelchair Access</h3>
    A playground that offers wheelchair access through the entrance, but not to all
    play elements.
  </div>
  <div class="row mt-2 mb-4 flex-1">
    <img alt="" class="image" src={wheelchairIcon} />
    <h3 class="text-xl font-base">Wheelchair Accessible</h3>
    A playground that has ramps or transfer stations or accessible play elements.
  </div>
</div>

<div class="flex border-b-2 border-black border-opacity-10">
  <div class="row mt-2 mb-4 basis-1/2">
    <img
      alt=""
      class="image"
      src="https://www.nycgovparks.org/common_images/img/restroom.gif"
    />
    <h3 class="text-xl font-base">Comfort Station</h3>
    A restroom icon indicates that the playground includes a comfort station.
  </div>
  <div class="row mt-2 mb-4 flex-1">
    <img
      alt=""
      class="image"
      src="https://www.nycgovparks.org/common_images/img/restroom_accessible.gif"
    />
    <h3 class="text-xl font-base">ADA Accessible Comfort Station</h3>
    A restroom icon with a wheelchair indicates that the comfort station meets the
    standards of the Americans with Disabilities Act
  </div>
</div>

<div class="flex border-b-2 border-black border-opacity-10">
  <div class="row mt-2 mb-4">
    <img
      alt=""
      class="image"
      src="https://www.nycgovparks.org/common_images/img/fa-eye-regular.gif"
    />
    <h3 class="text-xl font-base">Inclusive Play Elements</h3>
    These playgrounds contain elements designed for children with autism-spectrum
    disorders or other sensory processing disorders, such as loss of vision or hearing.
  </div>
</div>

<style>
  .row:not(:last-child) {
    margin-right: 1rem;
  }

  .image {
    height: 3.4em;
    width: auto;
  }
</style>
