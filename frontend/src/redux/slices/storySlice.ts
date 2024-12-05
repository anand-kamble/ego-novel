import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { stat } from "fs";
import { ac } from "react-router/dist/development/route-data-DuV3tXo2";

export interface StoryVersion {
  id: number;
  story_id: number;
  content: string;
  title: string;
  version: number;
}

export interface Story {
  story_id: string;
  title: string;
  username: number;
  versions: StoryVersion[];
  published: boolean;
  archived: boolean;
  created_at: string;
}

export interface StoryState {
  stories: Story[];
  id: string;
  loading: boolean;
  error: string | null;
  versions: StoryVersion[];
  content: string;
  translation: string;
  translationInProgress: boolean;
}

const initialState: StoryState = {
  stories: [],
  id: "",
  loading: false,
  error: null,
  versions: [],
  content: "",
  translation: "",
  translationInProgress: false,
};

export const storySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stories = action.payload.data;
        console.log(action.payload);
      })
      .addCase(getStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getVersions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVersions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.versions = action.payload.data;
        const currentVersion = [...action.payload.data].sort(
          (a, b) => b.version - a.version
        )[0];
        if (currentVersion && currentVersion.content)
          state.content = currentVersion.content;
      })
      .addCase(getVersions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stories = [{ ...action.payload.data[0] }, ...state.stories];
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeStory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.content = state.content + action.payload;
      })
      .addCase(completeStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.versions = [{ ...action.payload.data[0] }, ...state.versions];
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateStoryTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStoryTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStoryTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(trnaslateStory.pending, (state) => {
        state.translationInProgress = true;
        state.error = null;
      })
      .addCase(trnaslateStory.fulfilled, (state, action) => {
        state.translationInProgress = false;
        state.error = null;
        state.translation = action.payload;
      })
      .addCase(trnaslateStory.rejected, (state, action) => {
        state.translationInProgress = false;
        state.error = action.payload as string;
      });
  },
});

export const getStories = createAsyncThunk(
  "story/getStories",
  async ({ username }: { username: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BACKEND_URL + "/get_user_stories", {
        username,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getVersions = createAsyncThunk(
  "story/getVersions",
  async ({ story_id }: { story_id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BACKEND_URL + "/get_version", {
        story_id,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createStory = createAsyncThunk(
  "story/createStory",
  async ({ username }: { username: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(BACKEND_URL + "/create_story", {
        username,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStory = createAsyncThunk(
  "story/updateStory",
  async (
    {
      story_id,
      title,
      content,
      version,
      username,
    }: {
      story_id: string;
      title: string;
      content: string;
      version: number;
      username: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/update_story", {
        story_id,
        title,
        content,
        version,
        username,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const completeStory = createAsyncThunk(
  "story/completeStory",
  async (
    {
      story_id,
      content,
      title,
      model,
    }: {
      story_id: string;
      content: string;
      title: string;
      model: "openai" | "anthropic";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/complete_story", {
        story_id,
        content,
        title,
        model,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStoryTitle = createAsyncThunk(
  "story/updateStoryTitle",
  async (
    {
      story_id,
      title,
    }: {
      story_id: string;
      title: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/update_story_title", {
        story_id,
        title,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const trnaslateStory = createAsyncThunk(
  "story/translateStory",
  async (
    {
      content,
      model,
      language,
    }: {
      content: string;
      model: "openai" | "anthropic";
      language: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/translate_story", {
        content,
        model,
        language,
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Action creators are generated for each case reducer function
export const { updateContent } = storySlice.actions;
export default storySlice.reducer;
