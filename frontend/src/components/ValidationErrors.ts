// Login

export function checkEmailSignIn(email: string) {
  const errors: string[] = [];

  if (email.trim().length === 0) {
    errors.push("Email is required.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }
  }

  return errors;
}

export function checkPasswordSignIn(password: string) {
  const errors = [];

  if (password.length === 0) {
    errors.push("Password is required.");
  }

  return errors;
}

// Register

export function checkUsernameSignUp(username: string) {
  const errors = [];

  if (username.trim().length === 0) {
    errors.push("Username is required.");
  }

  return errors;
}

export function checkEmailSignUp(email: string) {
  const errors: string[] = [];

  if (email.trim().length === 0) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please enter a valid email address.");
    }
  }

  return errors;
}

export function checkPasswordSignUp(password: string) {
  const errors = [];

  if (!password) {
    errors.push("Password is required.");
  } else {
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      errors.push(
        "At least 8 characters, with uppercase, lowercase and a number.",
      );
    }
  }

  return errors;
}

export function checkConfirmPasswordSignUp(
  password: string,
  confirmPassword: string,
) {
  const errors = [];

  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  return errors;
}

// Edit Profile

// export function checkNickname(nickname: string) {
//   const errors = [];

//   if (nickname.trim().length === 0) {
//     errors.push("Nickname is required");
//   }

//   return errors;
// }

// export function checkGender(gender: string) {
//   const errors = [];

//   if (gender.trim().length === 0) {
//     errors.push("Gender is required");
//   }

//   return errors;
// }

// export function checkHeroClass(heroClass: string) {
//   const errors = [];

//   if (heroClass.trim().length === 0) {
//     errors.push("Hero class is required");
//   }

//   return errors;
// }

// Post Rumors

export function checkRumorTitle(title: string) {
  const errors = [];

  if (title.trim().length === 0) {
    errors.push("Title is required. ");
  }

  return errors;
}

export function checkRumorContent(content: string) {
  const errors = [];

  if (content.trim().length === 0) {
    errors.push("Content is required.");
  }

  return errors;
}
