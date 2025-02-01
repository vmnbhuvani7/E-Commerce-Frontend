export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      // credentials: "include", // Use cookies instead of localStorage
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProducts = async () => {
  try { const token = localStorage.getItem("token");
   
    const res = await  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      throw new Error("Something went wrong.");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};


export const signupUser = async (email, password) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      // credentials: "include", // Use cookies instead of localStorage
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const userCheckout = async (cart) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cart),
    });

    const data = await res.json(); // Parse response JSON

    if (!res.ok) {
      throw new Error(data?.error || "Something went wrong during checkout.");
    }

    localStorage.removeItem("cart");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
