import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("session_token");
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
console.log(" process.env.API_URL", process.env.NEXT_PUBLIC_API_URL);

const instance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "X-Access-Token": `${token}`,
  },
});

async function register(email, password, name) {
  try {
    const response = await instance.post("/api/register", {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again later.");
  }
}

export async function login(email, password, remember) {
  try {
    const response = await instance.post("/api/login", {
      email,
      password,
      remember,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again later.");
  }
}

export async function createGroup(name, icon) {
  try {
    const response = await instance.post("/api/groups", {
      name,
      icon,
    });
    return response.data;
  } catch (error) {
    throw new Error("Create Group failed. Please try again later.");
  }
}

export async function getAllGroups(name, icon) {
  try {
    const response = await instance.get("/api/groups");
    return response.data;
  } catch (error) {
    throw new Error("Create Group failed. Please try again later.");
  }
}

export async function getAllContactsByGroup(group_id) {
  try {
    const response = await instance.get(`/api/groups/${group_id}/contacts`);
    return response.data;
  } catch (error) {
    throw new Error("Get Companies By Group failed. Please try again later.");
  }
}

export async function deleteContactsById(group_id, id) {
  try {
    const response = await instance.delete(
      `/api/groups/${group_id}/contacts/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Contact deleted successfully");
  }
}

export async function createContactByGroup(group_id, data) {
  try {
    const response = await instance.post(
      `/api/groups/${group_id}/contacts`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Create Company By Group failed. Please try again later.");
  }
}

// app.put("/api/groups/:id", auth, controller.update);

export async function updateGroupById(group_id, data) {
  try {
    const response = await instance.put(`/api/groups/${group_id}`, data);
    debugger;
    return response.data;
  } catch (error) {
    throw new Error("Update Company By Group failed. Please try again later.");
  }
}

// /app.delete("/api/groups/:id", auth, controller.destroy);

export async function deleteGroupById(group_id) {
  try {
    const response = await instance.delete(`/api/groups/${group_id}`);
    return response.data;
  } catch (error) {
    throw new Error("Grpup deleted successfully");
  }
}

export async function createContactCompany(data) {
  try {
    const response = await instance.post(`/api/companies`, data);
    return response;
  } catch (error) {
    throw new Error("Create Company failed. Please try again later.");
  }
}

export async function getAllComments(contact_id) {
  try {
    const response = await instance.get(`/api/contacts/${contact_id}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createComment(contact_id, data) {
  try {
    const response = await instance.post(
      `/api/contacts/${contact_id}/comments`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Create Company By Group failed. Please try again later.");
  }
}

export async function updateCommentById(contact_id, data, comment_id) {
  try {
    const response = await instance.put(
      `/api/contacts/${contact_id}/comments/${comment_id}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Update Company By Group failed. Please try again later.");
  }
}

export async function deleteCommentById(contact_id, comment_id) {
  try {
    const response = await instance.delete(
      `/api/contacts/${contact_id}/comments/${comment_id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Comment deleted Failed");
  }
}

export async function getAllInteractions(contact_id) {
  try {
    const response = await instance.get(
      `/api/contacts/${contact_id}/interactions`
    );
    return response.data;
  } catch (error) {
    throw new Error("Get Companies By Group failed. Please try again later.");
  }
}

export async function deleteInteractionById(contact_id, interaction_id) {
  try {
    const response = await instance.delete(
      `/api/contacts/${contact_id}/interactions/${interaction_id}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Interaction deleted Failed");
  }
}

export async function createInteraction(contact_id, data) {
  try {
    const response = await instance.post(
      `/api/contacts/${contact_id}/interactions`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Create Company By Group failed. Please try again later.");
  }
}

export async function updateInteractionById(contact_id, data, interaction_id) {
  try {
    const response = await instance.put(
      `/api/contacts/${contact_id}/interactions/${interaction_id}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Update Company By Group failed. Please try again later.");
  }
}

export async function getCompany(id) {
  try {
    const response = await instance.get(`/api/companies/${id}`);
    return response.data.data[0];
  } catch (error) {
    throw new Error("Get Companies By Id failed. Please try again later.");
  }
}

export async function updateContactByGroup(group_id, data, contact_id) {
  try {
    const response = await instance.put(
      `/api/groups/${group_id}/contacts/${contact_id}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Update Company By Group failed. Please try again later.");
  }
}

export async function getContactById(group_id, contact_id) {
  try {
    const response = await instance.get(
      `/api/groups/${group_id}/contacts/${contact_id}`,
      data
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export default register;
