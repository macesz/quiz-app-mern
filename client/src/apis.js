export const fetchQuestions = async (difficulty, category_id, limit) => {
  const params = new URLSearchParams({ difficulty, category_id, limit });
  const response = await fetch(`/api/questions?${params.toString()}`);

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to fetch questions");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const postGameResult = async (user, finalScore, numberOfQuestions) => {
  try {
      const httpResponse = await fetch('/api/games', {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
              user_id: user._id,
              correct: finalScore,
              question_number: numberOfQuestions,
              rate: finalScore / numberOfQuestions
          })
      })
      return await httpResponse.json()
  } catch (error) {
      console.error('Error occurred at posting new result', error)
  }
}

export const fetchAndUpdateUser = async (headers, updateData) => {
  const response = await fetch(`/api/users`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(updateData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to update user");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const deleteUserProfile = async (headers) => {
  const response = await fetch(`/api/users`, {
    method: "DELETE",
    headers: headers
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to delete profile");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const fetchSignInUser = async (formData) => {
  const response = await fetch(`/api/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to sign in");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const fetchSignUpUser = async (formData) => {
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Failed to sign up");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
