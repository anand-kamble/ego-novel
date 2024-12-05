import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Select, Text, TextArea, TextField } from '@radix-ui/themes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { completeStory, createStory, getStories, getVersions, Story, trnaslateStory, updateContent, updateStory, updateStoryTitle } from '../../redux/slices/storySlice'
import { useNavigate, useParams } from 'react-router'

const Stories = () => {

  const { username, loggedIn } = useSelector((state: RootState) => state.user)
  const { stories, versions, content, loading, translation,translationInProgress } = useSelector((state: RootState) => state.story)
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  let currentStory: any;
  let currentVersion: any;
  if (id) {
    currentStory = stories.find((story) => story.story_id === id);
    currentVersion = [...versions].sort((a, b) => b.version - a.version)[0];
  }

  const [title, settitle] = useState<string>(currentVersion?.title || "");
  const [model, setModel] = useState<"openai" | "anthropic">("openai");
  const [translationLanguage, setTranslationLanguage] = useState<"Japanese" | "Chinese" | "Korean">("Japanese");


  const createNewStory = () => {
    console.log("username", username)
    if (username) {
      dispatch(createStory({ username }))
    }
  };

  const handleStoryChange = (id: string) => {
    navigate(`/stories/${id}`);
  };

  const handleCompleteStory = () => {

    if (id) {

      dispatch(completeStory({ story_id: id, content: content, title: currentStory?.title || "", model: "anthropic" }))
    }
  }

  const handleModelChange = (value: string) => {
    setModel(value as "openai" | "anthropic");
  }

  const onChangeContent = (value: string) => {
    dispatch(updateContent(value))
  }

  const onTranslate = () => {
    dispatch(trnaslateStory({ content: content, model: model, language: translationLanguage }))
  }

  const saveStory = () => {
    if (id) {
      dispatch(updateStory({ content: content, story_id: id, title: title, username: username!, version: (currentVersion.version || 0) + 1 }))
      if (title !== currentVersion.title) {
        dispatch(updateStoryTitle({ story_id: id, title })).then(() => {
          dispatch(getStories({ username: username! }))
        })
      }
    }
  }



  useEffect(() => {
    if (loggedIn) {
      if (username) {
        dispatch(getStories({
          username: username
        })).then((res) => {
          if (id) {
            dispatch(updateContent(""));
            dispatch(getVersions({ story_id: id })).then((res) => {
              console.log("res.payload", res.payload.data)
              currentVersion = [...res.payload.data].sort((a, b) => b.version - a.version)[0];
              settitle(currentVersion?.title || "");
            })
          }
        })
      }
    } else {
      navigate("/signin");
    }
  }, [dispatch, username, id])


  return (
    <Flex>
      <Flex>
        <Flex style={{
          "alignItems": "center",
          "justifyContent": "center",
        }} width={"250px"} direction={"column"}>
          <Box py={"3"}>
            <Text size={"3"} >My Stories</Text>
          </Box>

          <Flex direction={"column"}>
            {stories.map((story, index) => {
              return (
                <Box py={"1"} key={index}>
                  <Button style={{ width: "250px" }} onClick={() => handleStoryChange(story.story_id)} variant='soft'>{story.title}</Button>
                </Box>
              )
            })}
          </Flex>
          <Box py={"3"}>
            <Button style={{ width: "250px" }} onClick={createNewStory} variant='classic'>Create New Story</Button>
          </Box>
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Flex style={{
          alignItems: "center",
        }}>
          <TextField.Root style={{
            width: "calc(50vw - 125px)"
          }} size="3" placeholder="Story Title" value={title} onChange={(e) => settitle(e.currentTarget.value)} />
          <Box px={"6"} style={{
            display: "flex",
            alignItems: "center",
          }}>
            <Box px="4">
            <Text size={"3"}>Model:</Text>
            </Box>
            <Select.Root defaultValue="openai" value={model} onValueChange={handleModelChange} size={"3"}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>AI Model</Select.Label>
                  <Select.Item value="openai">OpenAI</Select.Item>
                  <Select.Item value="anthropic">Anthropic</Select.Item>
                </Select.Group>

              </Select.Content>
            </Select.Root>
            <Box px="4">
              <Text size={"3"}>Translate to:</Text>
            </Box>
            <Select.Root defaultValue="Japanese" value={translationLanguage} onValueChange={(v) => setTranslationLanguage(v as typeof translationLanguage)} size={"3"}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Languages</Select.Label>
                  <Select.Item value="Japanese">Japanese</Select.Item>
                  <Select.Item value="Chinese">Chinese</Select.Item>
                  <Select.Item value="Korean">Korean</Select.Item>
                </Select.Group>

              </Select.Content>
            </Select.Root>
          </Box>


        </Flex>
        <Flex>
          <TextArea style={{
            height: "calc(100vh - 240px)",
            width: "calc(50vw - 125px)"
          }} placeholder="Story Content" value={content} onChange={(e) => onChangeContent(e.currentTarget.value)} />
          <TextArea style={{
            height: "calc(100vh - 240px)",
            width: "calc(50vw - 125px)"
          }} placeholder="Translated Content" value={translation}/>
        </Flex>
        <Flex>
          <Flex gap={"3"} style={{
            width: "calc(50vw - 125px)",
            justifyContent: "center"
          }}>
            <Button disabled={loading} style={{ width: "250px" }} variant='classic' onClick={handleCompleteStory}>Generate</Button>
            <Button loading={loading} style={{ width: "250px" }} variant='classic' onClick={saveStory}>Save</Button>
          </Flex>
          <Button style={{ width: "250px" }} onClick={onTranslate} variant='classic' loading={translationInProgress}>Translate</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Stories
