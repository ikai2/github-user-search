<script>
    import { onMount } from 'svelte';

    export let data;
    let error = false;
    let theme;

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

<div class="p-2 max-w-3xl w-full">
    <div class="flex justify-between py-8">
        <p class="font-bold text-2xl">devfinder</p>
        <button on:click={toggleTheme} class='flex gap-3 items-center'>
            <span class="text-blue-pale text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
            <img src={theme === "light" ? 'icon-moon.svg' : 'icon-sun.svg'} 
            alt={theme === 'light' ? 'Dark Mode' : 'Light Mode'} />
        </button>
        </div>

    <form on:submit={handleSubmit} class="flex justify-between items-center p-3 bg-white rounded-2xl">
    <label for="username" class="px-5">
        <img src="icon-search.svg" alt="Search Icon">
    </label>
    <input class="flex-1 py-2 bg-transparent outline-none placeholder:text-primary-blue text-dark-input" type="text" name="username" id="username" placeholder="Search Github username...">
    {#if error}
    <span class="text-[red] font-bold mr-6">No results</span>
    {/if}
    <button type="submit" class="px-3 py-2 bg-accent-blue text-white rounded-lg h-full">Submit</button>
    </form> 

    {#if data}
    <div class="grid grid-cols-[auto_1fr] gap-11 mt-5 bg-white p-12 rounded-2xl">
    <img class="rounded-full w-[117px] row-span-3" src={data.avatar_url} alt="User Avatar" />
    <div class="grid grid-cols-2 gap-2">
        <h2 class="font-bold text-2xl text-dark-blue">{data.name}</h2>
        <p class="text-right self-center text-blue-pale">Joined {formatDate(data.created_at)}</p>
        <p class="text-accent-blue">@{data.login}</p>
        <p class="col-span-2 text-primary-blue mt-3">{data.bio ? data.bio : "This profile has no bio"}</p>
    </div>
      <div class="grid grid-cols-3 py-4 px-8 bg-bkg rounded-[10px] gap-4">
        <div>
            <p class="text-primary-blue text-sm">Repos</p>
            <p class="text-dark-blue font-bold text-xl">{data.public_repos}</p>
        </div>
        <div>
            <p class="text-primary-blue text-sm">Followers</p>
            <p class="text-dark-blue font-bold text-xl">{data.followers}</p>
        </div>
        <div>
            <p class="text-primary-blue text-sm">Following</p>
            <p class="text-dark-blue font-bold text-xl">{data.following}</p>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-y-4">
        <div class="flex gap-4 items-center">
            <img src="icon-location.svg" alt="location icon">
            <p>{data.location ? data.location : "Not Available"}</p>
        </div>
        <div class="flex gap-4 items-center">
            <img src="icon-twitter.svg" alt="twitter icon">
            <p>{data.twitter_username ? data.twitter_username : "Not Available"}</p>
        </div>
        <div class="flex gap-4 items-center">
            <img src="icon-website.svg" alt="website icon">
            <p>{data.blog ? data.blog : "Not Available"}</p>
        </div>
        <div class="flex gap-4 items-center">
            <img src="icon-company.svg" alt="company icon">
            <p>{data.company ? data.company : "Not Available"}</p>
        </div>
    </div>
  </div>
  {/if}
</div>