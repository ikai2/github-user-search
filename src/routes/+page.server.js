let cachedData = null;

async function fetchUser(fetch, username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        throw new Error('Failed to load the default user');
    }
     return res.json();
}

export async function load({ fetch }) {
    if (cachedData) {
        return cachedData
    }
    try {
        const username = 'octocat';
        const data = await fetchUser(fetch, username)
        cachedData = data;
        return data;
    } catch (err) {
        return err.message;
    }
}
