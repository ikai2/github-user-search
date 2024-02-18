<script>
    let username = '';
    export async function getUser() {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const result = await res.json();
        return result;
    }
    let data;
    
    </script>
    <h1>Welcome to SvelteKit</h1>
    <form on:submit|preventDefault={getUser}>
        <input bind:value={username} type="text" name="" id="">
        <button type="submit">Submit</button>
    </form> 
    
    {#if data}
        <div>
            <h2>User: {data.name}</h2>
            <img src={data.avatar_url} alt="User Avatar" />
            <p>Followers: {data.followers}</p>
            <p>Following: {data.following}</p>
            <p><a href={data.html_url} target="_blank">GitHub Profile</a></p>
        </div>
    {/if}