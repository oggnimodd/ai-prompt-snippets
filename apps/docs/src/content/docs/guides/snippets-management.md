---
title: Snippets Management
description: Learn how to create and customize your AI chat snippets
sidebar: 
  order: 1
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 4
---

## Managing Your Prompt Snippets

You can manage your prompt snippets through the extension's options page. To access it, right-click on the extension popup and select 'Options,' or click the three-dot menu, go to 'Extensions' > 'Manage Extensions,' find the desired extension, click 'Details,' and then select 'Extension options.

<img src="/images/screenshots/options-page.gif" alt="How to open extension options page"/>

## Understanding the Structure of AI Prompt Snippets

### Title

The title serves as the name of your snippet and helps you filter and search for your snippets. 

:::tip
Personalize the title according to your needs. It doesn't have to explain the snippet's purpose. You can use simple titles like "1" or "email" for quick search.
:::

### Prompt

A prompt is an instruction given to an AI Chat Platform. If you're unfamiliar with the term "AI prompts," a quick Google search will provide detailed explanations about AI chat platforms and prompts. Essentially, a prompt is a direction given to the AI. Here are a few examples of simple prompts:

- Tell me a random fun fact about the Moon
- How to create flavorful homemade vegetable soup
- Provide me with a list of the best beaches in Rio de Janeiro, Brazil, and describe each beach in detail. Be concise.
- What is the meaning of the word "serendipity"?

### Parameters

Looking at the prompts above, we can save them as reusable snippets. However, often, we use prompts similar to the ones above but modify specific parts. For example:

- Tell me a random fun fact about the Sun
- How to create flavorful homemade pizza
- Provide me with a list of the best beaches in Bali, Indonesia, and describe each beach in detail. Be concise.
- What is the meaning of the word "liminal"?

Instead of creating separate snippets for each, consider using placeholders:

- Tell me a random fun fact about [**something**]
- How to create [**cuisine**]
- Provide me with a list of the best beaches in [**place**], and describe each beach in detail. Be concise.
- What is the meaning of the word [**word**]?

Now, these snippets have parameters that you can input dynamically whenever you use them. This makes your snippets reusable and more powerful.

:::tip
A snippet doesn't always have to have parameters. Sometimes, prompts don't need any parameters, such as:
- Recommend me random popular songs
- Generate random short stories
:::

:::note
For now, this Chrome extension will not automatically add parameter fields based on the text you enclosed in square brackets in the prompt. So, you still have to manually add the parameters by clicking **"Add Parameter"** and ensuring the **"name"** of the parameter matches what you want in the prompt.

<img src="/images/screenshots/limitation.gif" alt="Limitation"/>
:::

### Types of Parameters

#### Text Parameter

This parameter is a text that replaces the text inside square brackets. For example, in the prompt:

Tell me a random fun fact about [something]

You now can add a simple text for "something," like "The Moon" or "The Sun" and this extension will generate "Tell me a random fun fact about **The Moon**" or "Tell me a random fun fact about **The Sun**".

#### Option Parameter

This parameter is useful if you want the parameter value to be limited to specific options, and you don't want to input it manually every time you use the snippet. For example, in the prompt:

Please rephrase the following text to sound more [tone]. "[text]"

You might want the tone to be limited to options like formal, sad, happy, angry, without any other options. Here, you can use an option parameter.

## Adding a New Snippet

To add a new snippet, go to the Options page and click on "Add." Fill out the form as per the [snippet structure guidelines above](#understanding-the-structure-of-ai-prompt-snippets) and remember to click the save button.

## Editing a Snippet

To edit a snippet, go to the Options page and click the "View Details" link on the snippet card you want to edit. This action will take you to the detailed page of that snippet. Make the desired changes and don't forget to click the save button.

## Clearing All Snippets

To clear all your snippets, go to the Options page and click "Clear." This action will delete all your snippets, so please use it with caution.

## Deleting an Individual Snippet

To delete an individual snippet, go to the Options page and click the "Trash" icon button on the snippet card you want to delete.

## Exporting All Snippets

You can export all your snippets to save or share with others. Go to the Options page and click "Export."

## Exporting an Individual Snippet

To export an individual snippet, go to the Options page and click the "View Details" link on the snippet card you want to export. This action will take you to the detailed page of that snippet. Click the export button in the header.

## Importing Snippets

To import snippets, go to the Options page and click the import button. Locate your snippet file. If the file is invalid, you'll see an error message. If the file is valid, you'll receive a notification, and the snippet will immediately appear on your Options page.
