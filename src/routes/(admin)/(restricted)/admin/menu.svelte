<script lang="ts">
import PreviewEyeIcon from './icons/PreviewEyeIcon.svelte';
import { goto } from '$app/navigation';
import { eraseCookie } from '$lib/utils/common';
import { currentUser } from '@/stores/main';


const logout = () =>{
    eraseCookie('hash');
    eraseCookie('username');
    goto('/login');
}

</script>

<div id="menu" class="bg-white/4 col-span-3 rounded-lg p-4 ">
    <h2 class="font-bold text-lg lg:text-3xl bg-linear-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
    Control Panel
    </h2>
    <p class="text-slate-400 text-sm mb-2">Welcome back,</p>
    
    {#if $currentUser}
    <a href="{`/admin/users/edit/${$currentUser.id}`}" class="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
        <div>
            {#if $currentUser.avatar}
            <img class="rounded-full w-10 h-10 relative object-cover" src="{$currentUser.avatar}" alt="">
            {:else}
            <svg enable-background="new -208.5 20.5 100 100" id="Layer_1" version="1.1" viewBox="-208.5 20.5 100 100" class="w-10 h-10" ><g><circle cx="-158.5" cy="70.5" fill="#F5EEE5" r="50"/><g><defs><circle cx="-158.5" cy="70.5" id="SVGID_1_" r="50"/></defs><clipPath id="SVGID_2_"><use overflow="visible" xlink:href="#SVGID_1_"/></clipPath><path clip-path="url(#SVGID_2_)" d="M-143.5,96.4l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8h-100v-9.8     c1.3-3.1,3.9-5.5,7.1-6.6l27.9-7.7V81.5h30V96.4z" fill="#D4B08C"/><g clip-path="url(#SVGID_2_)"><defs><path d="M-143.5,96.4l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8h-100v-9.8c1.3-3.1,3.9-5.5,7.1-6.6l27.9-7.7V81.5h30       V96.4z" id="SVGID_3_"/></defs><clipPath id="SVGID_4_"><use overflow="visible" xlink:href="#SVGID_3_"/></clipPath><path clip-path="url(#SVGID_4_)" d="M-158.3,100.5h-7.2l-8-4.1l-35-0.9v25h50.2h50.2v-25h-38.2l-4.8,5H-158.3z" fill="#1E1F24"/></g></g><path d="M-158.5,94.5c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10    s-1.9-22.4-1.9-26.4c0-5.7,5.1-14.5,19.9-14.5c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c14.8,0,19.9,8.8,19.9,14.5    c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3C-155,94.2-157,94.5-158.5,94.5L-158.5,94.5z" fill="#F2CEA5"/><g><defs><path d="M-158.5,94.5c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10      s-1.9-22.4-1.9-26.4c0-5.7,5.1-14.5,19.9-14.5c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c14.8,0,19.9,8.8,19.9,14.5      c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3C-155,94.2-157,94.5-158.5,94.5L-158.5,94.5z" id="SVGID_5_"/></defs><clipPath id="SVGID_6_"><use overflow="visible" xlink:href="#SVGID_5_"/></clipPath><path clip-path="url(#SVGID_6_)" d="M-147.5,81.5c-1-1.2-3-2.9-6.3-3s-2.5,1.9-4.7,2c0,0-0.1,0-0.1,0     c0,0,0,0-0.1,0c-2.1-0.1-1.3-2-4.7-2s-5.4,1.7-6.3,3l-8-11v27h19.1h19.1v-27L-147.5,81.5z M-154.5,88.5c-1.1-0.1-1.7-0.4-2-0.8     c0-0.6-0.4-1.3-2.1-1.2c-1.7-0.1-2,0.6-2.1,1.2c-0.3,0.4-0.9,0.8-2,0.8c-3.8-0.2-5-2.7-5-4.5s1.5-2.5,5-2.5c2.5,0,1.7,0.9,4,1     c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c2.3,0,1.5-1,4-1c3.5,0,5,0.7,5,2.5S-150.7,88.3-154.5,88.5z" fill="#2D2E35"/></g><path d="M-155.5,85.5h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S-154.9,85.5-155.5,85.5z" fill="#A3705F"/><path d="M-149.5,67.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S-150.6,67.5-149.5,67.5z M-167.5,67.5    c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S-168.6,67.5-167.5,67.5z" fill="#262626"/><path d="M-161.9,64c-0.5-0.8-1.9-2.5-5.5-2.5c-4.1,0-5.1,2.3-5.1,2.4l-1.9-0.7c0.1-0.1,1.4-3.6,7-3.6    c4.6,0,6.6,2.4,7.2,3.5L-161.9,64z" fill="#CC9872"/><path d="M-157.5,74.5c0-0.3,0-7.1,0-9c0-2.5,2.5-5.9,8-6c5.5,0,6.9,3.5,7,3.6l-1.9,0.7c0-0.1-1-2.3-5.1-2.4    c-4.1,0-6,2.4-6,4c0,1.9,0,8.9,0,9L-157.5,74.5z" fill="#BB8660"/><path d="M-173.4,94.9l1.7-2.8l12.9,5.9l13.1-4.9l2.2,2.2v6.5c0,0-10.8,10.6-15,10.7c-4.2,0-14.9-11.5-14.9-11.5    V94.9z" fill="#D4B08C"/><g><defs><circle cx="-158.5" cy="70.5" id="SVGID_7_" r="50"/></defs><clipPath id="SVGID_8_"><use overflow="visible" xlink:href="#SVGID_7_"/></clipPath><path clip-path="url(#SVGID_8_)" d="M-143.5,96.4c0,2.3,0,3.2,0,5.1c0,14.1-8.5,19.7-8.5,19.7l-1.8,0     c0,0-4.4,0-4.4,0l-4.3,0l-1.8,0c0,0-9.2-6.7-9.2-18.7c0-2,0-5.2,0-6.1c1,1,2.6,9.1,15.3,9.1S-144.5,97.4-143.5,96.4z" fill="#6B363E"/></g><rect fill="#E1BC90" height="2" width="17.9" x="-167.4" y="50.5"/><rect fill="#E1BC90" height="2" width="9.9" x="-163.4" y="54.5"/><path d="M-139.4,65.5c0,0,0.1-13.1-5.5-20.3c-1.3,1.2-3.5,2.2-6.5,2.2s-5.9-1.1-9.3-2.8s-5.3-3.1-8.3-3.4    c-2,0.7-8.5,5.9-8.5,14.9s0.2,12.3,0.2,12.3s-4.2-5.7-4.2-14.3s4.8-14.8,10.7-15c2.4-2.2,7-3.8,11.9-3.8s14.5,2.4,18.5,9.2    C-134.5,54.4-139.4,65.5-139.4,65.5z" fill="#2D2E35"/></g></svg>
            {/if}
        </div>
        <div>
            <p class="font-medium group-hover:text-indigo-400 leading-4">{ $currentUser.username }</p>
            {#if $currentUser.email}
            <span class="text-xs text-slate-400">{$currentUser.email}</span>
            {/if}
            {#if $currentUser.role}
            <span class="text-xs text-slate-400"><small>Role: {$currentUser.role}</small></span>
            {/if}
        </div>
    </a>
    {:else}
    <a href="#menu" class="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2">
        <div>
          <svg enable-background="new -208.5 20.5 100 100" id="Layer_1" version="1.1" viewBox="-208.5 20.5 100 100" class="w-10 h-10" ><g><circle cx="-158.5" cy="70.5" fill="#F5EEE5" r="50"/><g><defs><circle cx="-158.5" cy="70.5" id="SVGID_1_" r="50"/></defs><clipPath id="SVGID_2_"><use overflow="visible" xlink:href="#SVGID_1_"/></clipPath><path clip-path="url(#SVGID_2_)" d="M-143.5,96.4l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8h-100v-9.8     c1.3-3.1,3.9-5.5,7.1-6.6l27.9-7.7V81.5h30V96.4z" fill="#D4B08C"/><g clip-path="url(#SVGID_2_)"><defs><path d="M-143.5,96.4l27.9,7.7c3.2,1.1,5.7,3.5,7.1,6.6v9.8h-100v-9.8c1.3-3.1,3.9-5.5,7.1-6.6l27.9-7.7V81.5h30       V96.4z" id="SVGID_3_"/></defs><clipPath id="SVGID_4_"><use overflow="visible" xlink:href="#SVGID_3_"/></clipPath><path clip-path="url(#SVGID_4_)" d="M-158.3,100.5h-7.2l-8-4.1l-35-0.9v25h50.2h50.2v-25h-38.2l-4.8,5H-158.3z" fill="#1E1F24"/></g></g><path d="M-158.5,94.5c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10    s-1.9-22.4-1.9-26.4c0-5.7,5.1-14.5,19.9-14.5c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c14.8,0,19.9,8.8,19.9,14.5    c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3C-155,94.2-157,94.5-158.5,94.5L-158.5,94.5z" fill="#F2CEA5"/><g><defs><path d="M-158.5,94.5c-1.5,0-3.5-0.3-4.8-0.9c-1.6-0.7-7.2-4.6-9.1-6.3c-2.5-2.3-3.8-5.1-4.2-10      s-1.9-22.4-1.9-26.4c0-5.7,5.1-14.5,19.9-14.5c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c14.8,0,19.9,8.8,19.9,14.5      c0,4-1.5,21.5-1.9,26.4s-1.6,7.7-4.2,10c-1.9,1.7-7.6,5.6-9.1,6.3C-155,94.2-157,94.5-158.5,94.5L-158.5,94.5z" id="SVGID_5_"/></defs><clipPath id="SVGID_6_"><use overflow="visible" xlink:href="#SVGID_5_"/></clipPath><path clip-path="url(#SVGID_6_)" d="M-147.5,81.5c-1-1.2-3-2.9-6.3-3s-2.5,1.9-4.7,2c0,0-0.1,0-0.1,0     c0,0,0,0-0.1,0c-2.1-0.1-1.3-2-4.7-2s-5.4,1.7-6.3,3l-8-11v27h19.1h19.1v-27L-147.5,81.5z M-154.5,88.5c-1.1-0.1-1.7-0.4-2-0.8     c0-0.6-0.4-1.3-2.1-1.2c-1.7-0.1-2,0.6-2.1,1.2c-0.3,0.4-0.9,0.8-2,0.8c-3.8-0.2-5-2.7-5-4.5s1.5-2.5,5-2.5c2.5,0,1.7,0.9,4,1     c0,0,0.1,0,0.1,0c0,0,0,0,0.1,0c2.3,0,1.5-1,4-1c3.5,0,5,0.7,5,2.5S-150.7,88.3-154.5,88.5z" fill="#2D2E35"/></g><path d="M-155.5,85.5h-6c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S-154.9,85.5-155.5,85.5z" fill="#A3705F"/><path d="M-149.5,67.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S-150.6,67.5-149.5,67.5z M-167.5,67.5    c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S-168.6,67.5-167.5,67.5z" fill="#262626"/><path d="M-161.9,64c-0.5-0.8-1.9-2.5-5.5-2.5c-4.1,0-5.1,2.3-5.1,2.4l-1.9-0.7c0.1-0.1,1.4-3.6,7-3.6    c4.6,0,6.6,2.4,7.2,3.5L-161.9,64z" fill="#CC9872"/><path d="M-157.5,74.5c0-0.3,0-7.1,0-9c0-2.5,2.5-5.9,8-6c5.5,0,6.9,3.5,7,3.6l-1.9,0.7c0-0.1-1-2.3-5.1-2.4    c-4.1,0-6,2.4-6,4c0,1.9,0,8.9,0,9L-157.5,74.5z" fill="#BB8660"/><path d="M-173.4,94.9l1.7-2.8l12.9,5.9l13.1-4.9l2.2,2.2v6.5c0,0-10.8,10.6-15,10.7c-4.2,0-14.9-11.5-14.9-11.5    V94.9z" fill="#D4B08C"/><g><defs><circle cx="-158.5" cy="70.5" id="SVGID_7_" r="50"/></defs><clipPath id="SVGID_8_"><use overflow="visible" xlink:href="#SVGID_7_"/></clipPath><path clip-path="url(#SVGID_8_)" d="M-143.5,96.4c0,2.3,0,3.2,0,5.1c0,14.1-8.5,19.7-8.5,19.7l-1.8,0     c0,0-4.4,0-4.4,0l-4.3,0l-1.8,0c0,0-9.2-6.7-9.2-18.7c0-2,0-5.2,0-6.1c1,1,2.6,9.1,15.3,9.1S-144.5,97.4-143.5,96.4z" fill="#6B363E"/></g><rect fill="#E1BC90" height="2" width="17.9" x="-167.4" y="50.5"/><rect fill="#E1BC90" height="2" width="9.9" x="-163.4" y="54.5"/><path d="M-139.4,65.5c0,0,0.1-13.1-5.5-20.3c-1.3,1.2-3.5,2.2-6.5,2.2s-5.9-1.1-9.3-2.8s-5.3-3.1-8.3-3.4    c-2,0.7-8.5,5.9-8.5,14.9s0.2,12.3,0.2,12.3s-4.2-5.7-4.2-14.3s4.8-14.8,10.7-15c2.4-2.2,7-3.8,11.9-3.8s14.5,2.4,18.5,9.2    C-134.5,54.4-139.4,65.5-139.4,65.5z" fill="#2D2E35"/></g></svg>
        </div>
        <div>
            <p class="font-medium group-hover:text-indigo-400 leading-4">JonDoe1337</p>
            <span class="text-xs text-slate-400">JonDoe1337@gmail.com</span>
        </div>
    </a>
    {/if}
    
    <hr class="my-2 border-slate-700">
    <div id="menu" class="flex flex-col space-y-2 my-5">
        <a href="/" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                      <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-400" ><g id="website_favorite_site_star_2_"><g id="website_favorite_site_star_1_"><g id="response_time_3_"><circle cx="7.5" cy="5.5" fill="#263238" id="XMLID_1569_" r="0.5"/><circle cx="5.5" cy="5.5" fill="#263238" id="XMLID_1568_" r="0.5"/><circle cx="3.5" cy="5.5" fill="#263238" id="XMLID_1567_" r="0.5"/><path d="M30.5,8h-29C1.224,8,1,7.776,1,7.5S1.224,7,1.5,7h29C30.776,7,31,7.224,31,7.5     S30.776,8,30.5,8z" fill="#263238" id="XMLID_1566_"/><path d="M29.5,3h-27C1.673,3,1,3.673,1,4.5v23C1,28.327,1.673,29,2.5,29h27     c0.827,0,1.5-0.673,1.5-1.5v-23C31,3.673,30.327,3,29.5,3z M30,27.5c0,0.275-0.225,0.5-0.5,0.5h-27C2.225,28,2,27.775,2,27.5v-23     C2,4.225,2.225,4,2.5,4h27C29.775,4,30,4.225,30,4.5V27.5z" fill="#263238" id="XMLID_3165_"/></g></g><g id="XMLID_1606_"><g id="XMLID_2018_"><path d="M24.5,22h3c0.276,0,0.5-0.224,0.5-0.5S27.776,21,27.5,21h-3c-0.276,0-0.5,0.224-0.5,0.5     S24.224,22,24.5,22z" fill="#263238" id="XMLID_2019_"/></g><g id="XMLID_2016_"><path d="M17.5,24h3c0.276,0,0.5-0.224,0.5-0.5S20.776,23,20.5,23h-3c-0.276,0-0.5,0.224-0.5,0.5     S17.224,24,17.5,24z" fill="#263238" id="XMLID_2017_"/></g><g id="XMLID_2014_"><path d="M17.5,26h5c0.276,0,0.5-0.224,0.5-0.5S22.776,25,22.5,25h-5c-0.276,0-0.5,0.224-0.5,0.5     S17.224,26,17.5,26z" fill="#263238" id="XMLID_2015_"/></g><g id="XMLID_2012_"><path d="M24.5,26h1c0.276,0,0.5-0.224,0.5-0.5S25.776,25,25.5,25h-1c-0.276,0-0.5,0.224-0.5,0.5     S24.224,26,24.5,26z" fill="#263238" id="XMLID_2013_"/></g><g id="XMLID_2010_"><path d="M17.5,22h5c0.276,0,0.5-0.224,0.5-0.5S22.776,21,22.5,21h-5c-0.276,0-0.5,0.224-0.5,0.5     S17.224,22,17.5,22z" fill="#263238" id="XMLID_2011_"/></g><g id="XMLID_2008_"><path d="M22.5,24h5c0.276,0,0.5-0.224,0.5-0.5S27.776,23,27.5,23h-5c-0.276,0-0.5,0.224-0.5,0.5     S22.224,24,22.5,24z" fill="#263238" id="XMLID_2009_"/></g><g id="XMLID_1989_"><path d="M14.5,24h-3c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h3c0.276,0,0.5,0.224,0.5,0.5     S14.776,24,14.5,24z" fill="#263238" id="XMLID_2007_"/></g><g id="XMLID_1987_"><path d="M12.5,26h-3C9.224,26,9,25.776,9,25.5S9.224,25,9.5,25h3c0.276,0,0.5,0.224,0.5,0.5     S12.776,26,12.5,26z" fill="#263238" id="XMLID_1988_"/></g><g id="XMLID_1611_"><path d="M7.5,26h-3C4.224,26,4,25.776,4,25.5S4.224,25,4.5,25h3C7.776,25,8,25.224,8,25.5     S7.776,26,7.5,26z" fill="#263238" id="XMLID_1612_"/></g><g id="XMLID_1609_"><path d="M15.5,18h-10C5.224,18,5,17.776,5,17.5S5.224,17,5.5,17h10c0.276,0,0.5,0.224,0.5,0.5     S15.776,18,15.5,18z" fill="#263238" id="XMLID_1610_"/></g><g id="XMLID_1985_"><path d="M14.5,22h-10C4.224,22,4,21.776,4,21.5S4.224,21,4.5,21h10c0.276,0,0.5,0.224,0.5,0.5     S14.776,22,14.5,22z" fill="#263238" id="XMLID_1986_"/></g><g id="XMLID_1607_"><path d="M9.5,24h-5C4.224,24,4,23.776,4,23.5S4.224,23,4.5,23h5c0.276,0,0.5,0.224,0.5,0.5     S9.776,24,9.5,24z" fill="#263238" id="XMLID_1608_"/></g></g><g id="XMLID_1990_"><path d="M27.5,18h-23C4.224,18,4,17.776,4,17.5v-7C4,10.224,4.224,10,4.5,10h23    c0.276,0,0.5,0.224,0.5,0.5v7C28,17.776,27.776,18,27.5,18z M5,17h22v-6H5V17z" fill="#263238" id="XMLID_1991_"/></g></g></svg>
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Home</p>
                <p class="text-slate-400 text-sm hidden md:block">Front Page</p>
                </div>
                
            </div>
        </a>
        <a href="/preview" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                    <PreviewEyeIcon class="w-6 h-6 group-hover:text-indigo-400" />
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Preview Drafts</p>
                <p class="text-slate-400 text-sm hidden md:block">Preview Drafts</p>
                </div>
                
            </div>
        </a>
        <a href="/admin" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Posts</p>
                <p class="text-slate-400 text-sm hidden md:block">List / Edit</p>
                </div>
                
            </div>
        </a>
        <a href="/admin/posts/add" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>                              
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">New Post</p>
                <p class="text-slate-400 text-sm hidden md:block">Create</p>
                </div>
                <!-- <div class="absolute -top-3 -right-3 md:top-0 md:right-0 px-2 py-1.5 rounded-full bg-indigo-800 text-xs font-mono font-bold">23</div> -->
            </div>
        </a>
        <a href="/admin/users" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>                              
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Users</p>
                <p class="text-slate-400 text-sm hidden md:block">Manage users</p>
                </div>
                
            </div>
        </a>
        <a href="/admin/settings/categories" class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-indigo-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                        
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Settings</p>
                <p class="text-slate-400 text-sm hidden md:block">Edit settings</p>
                </div>
                
            </div>
        </a>
        <button onclick={logout} class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 group-hover:text-indigo-400"><g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z"/></g></svg>
                </div>
                <div>
                    <p class="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">Log Out</p>
                <p class="text-slate-400 text-sm hidden md:block">Exit Panel</p>
                </div>
                
            </div>
        </button>

        
    </div>
    <p class="text-sm text-center text-gray-600">{`Date: ${ new Date().toDateString()}`}</p>
</div>