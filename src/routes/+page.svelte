<script>
    import { onMount } from 'svelte';

    export let data;
    let error = false;
    let theme = 'light';

    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        document.documentElement.setAttribute('data-theme', currentTheme);
        theme = currentTheme;
    }

    onMount(() => {
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        theme = savedTheme;
    });

    async function getUser(username) {
        try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error(`Error:${res.status} User not found`);
        data = await res.json();
        error = false
        } catch(err) {
            console.error(err)
            error = true;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        await getUser(username);
        e.target.reset();
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        }).format(date);
    }

</script>



<div class="p-6 max-w-3xl w-full">
    <div class="flex justify-between py-8">
        <p class="font-bold text-2xl text-dark-text">devfinder</p>
        <button on:click={toggleTheme} class='flex gap-3 items-center'>
            {#if theme === "light"}
            <span class="text-blue-pale text-sm hover:text-dark-text">DARK</span>
            {:else}
            <span class="text-white text-sm hover:text-blue-pale">LIGHT</span>
            {/if}
            <img src={theme === "light" ? 'icon-moon.svg' : 'icon-sun.svg'} 
            alt={theme === 'light' ? 'Dark Mode' : 'Light Mode'} />
        </button>
    </div>

    <form on:submit={handleSubmit} class="flex justify-between items-center p-3 bg-bkg-white rounded-2xl shadow-lg">
    <label for="username" class="px-3 md:px-5">
        <img src="icon-search.svg" alt="Search Icon">
    </label>
    <input class="flex-1 py-2 text-[12px] sm:text-lg bg-transparent outline-none placeholder:text-primary-blue text-dark-text" type="text" name="username" id="username" placeholder="Search Github username...">
    {#if error}
    <span class="text-[#F74646] font-bold mr-6">No results</span>
    {/if}
    <button type="submit" class="px-3 py-2 bg-accent-blue text-white rounded-lg h-full hover:bg-[#60ABFF]">Search</button>
    </form> 

    {#if data}
    <div class="grid grid-cols-[117px_1fr] gap-6 lg:gap-7 mt-5 bg-bkg-white p-6 md:p-12 rounded-2xl shadow-lg">
    <img class="rounded-full w-[117px] md:row-span-5" src={data.avatar_url} alt="User Avatar" />
    <div class="grid md:grid-cols-2 gap-2">
        {#if data.name}
        <h2 class="font-bold text-2xl text-dark-text">{data.name}</h2>
        {:else}
        <h2 class="font-bold text-2xl text-dark-text">{data.login.replace('@', '')}</h2>
        {/if} 
        <p class="md:text-right self-center text-dark-text">Joined {formatDate(data.created_at)}</p>
        <p class="text-accent-blue row-start-2 row-end-2 :lgrow-start-auto lg:row-end-auto">@{data.login}</p>
    </div>
    {#if data.bio}
    <p class="text-primary-blue mt-3 col-start-1 col-end-3 md:col-start-auto md:col-end-auto">{data.bio}</p>
    {:else}
    <p class="text-primary-blue mt-3 col-start-1 col-end-3 md:col-start-auto md:col-end-auto opacity-6">This profile has no bio</p>
    {/if} 
    <div class="grid grid-cols-3 py-4 px-8 bg-bkg rounded-[10px] gap-4 col-start-1 col-end-3 md:col-start-auto md:col-end-auto">
        <div>
            <p class="text-dark-text text-sm">Repos</p>
            <p class="text-dark-text font-bold text-xl">{data.public_repos}</p>
        </div>
        <div>
            <p class="text-dark-text text-sm">Followers</p>
            <p class="text-dark-text font-bold text-xl">{data.followers}</p>
        </div>
        <div>
            <p class="text-dark-text text-sm">Following</p>
            <p class="text-dark-text font-bold text-xl">{data.following}</p>
        </div>
    </div>
    <div class="grid md:grid-cols-2 gap-y-4 gap-x-20">
        <div class="flex gap-4 items-center text-sm" class:not-available={data.location === null}>
            <img src="icon-location.svg" alt="location icon">
            {#if data.location}
            <p class="text-dark-text">{data.location}</p>
            {:else}
            <p class="text-primary-blue">Not Available</p>
            {/if}
        </div>
        <div class="flex gap-4 items-center text-sm" class:not-available={data.twitter_username === null}>
            <img src="icon-twitter.svg" alt="twitter icon">
            {#if data.twitter_username}
            <p class="text-dark-text">{data.twitter_username}</p>
            {:else}
            <p class="text-primary-blue">Not Available</p>
            {/if}
        </div>
        <div class="flex gap-4 items-center text-sm" class:not-available={data.blog === null}>
            <img src="icon-website.svg" alt="website icon">
            {#if data.blog}
            <a href={data.blog} class="hover:underline">
                <span class="text-dark-text">{data.blog}</span>
            </a>
            {:else}
            <p class="text-primary-blue">Not Available</p>
            {/if}
        </div>
        <div class="flex gap-4 items-center text-sm" class:not-available={data.company === null}>
            <img src="icon-company.svg" alt="company icon">
            {#if data.company}
            <p class="text-dark-text">{data.company}</p>
            {:else}
            <p class="text-primary-blue">Not Available</p>
            {/if}
        </div>
    </div>
  </div>
  {/if}
</div>


<style>
.not-available {
  opacity: 0.5;
}
</style>