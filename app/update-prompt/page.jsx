"use client"

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()  /* These are the params passed in the url (?id="") */
    const promptId = searchParams.get("id")     /* It´s an object so we get it by it´s key */

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        post: "",
        tag: ""
    })

    useEffect(() => {
        const getPromptDetails = async () => {
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json()

          setPost({
            prompt: data.prompt,
            tag: data.tag
          })
        }
        if (promptId) {
          getPromptDetails()
        }

    }, [promptId])

    const updatePrompt = async (e) => {
    e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert("Prompt ID not found.")

        try {
            const response = await fetch(`/api/prompt/${promptId}`,     /* We will create this API OURSELF !!! */
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        prompt: post.prompt,
                        tag: post.tag
                    })
                })
            
            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
  )
}

const Page = () => {
    return(
        <Suspense>
            <EditPrompt />
        </Suspense>
    )
}

export default Page