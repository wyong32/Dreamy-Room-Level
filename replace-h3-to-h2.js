import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --- Configuration ---
// Adjust this path if your script is located elsewhere relative to the target file
const dataFilePath = path.join(__dirname, 'src/datas/guides/guides-101-110.js')
// --- End Configuration ---

// Regex to find each guide object and capture relevant parts
// Captures: 1: full id, 2: level number, 3: opening quote of keywords, 4: keywords content
const guideBlockRegex = new RegExp(
  '{' + // 对象开始
    "\\s*id:\\s*'(game-level-(\\d+))'" + // id 属性 (捕获 'game-level-XX' 和 'XX') -> group 1, 2
    '[\\s\\S]*?' + // 任何字符 (非贪婪), 直到 seo object
    'seo:\\s*{' + // seo 对象开始
    '[\\s\\S]*?' + // 任何字符 (非贪婪), 直到 keywords
    'keywords:\\s*([\'"`])([\\s\\S]*?)\\3' + // keywords 属性, 捕获: 3: 引号, 4: 内容
    // [\\s\\S]*? 捕获引号内的所有内容, 直到第一个匹配的结束引号 \3
    '[\\s\\S]*?' + // 任何字符 (非贪婪), 直到 seo 对象结束
    '}' + // seo 对象结束
    '[\\s\\S]*?' + // 任何字符 (非贪婪), 直到主对象结束
    '}', // 主对象结束
  'g', // 全局匹配
)

async function updateKeywords() {
  try {
    console.log(`准备读取文件: ${dataFilePath}`)
    const originalFileContent = await fs.readFile(dataFilePath, 'utf8')
    console.log(`文件读取完毕。`)

    let modifiedContent = originalFileContent
    let changesMade = false
    const updatesToApply = []

    const matches = [...originalFileContent.matchAll(guideBlockRegex)]
    console.log(`通过 Regex 找到 ${matches.length} 个潜在的关卡块。`)
    if (matches.length === 0) {
      console.warn('警告: 未能通过正则表达式找到任何关卡块。请检查 guideBlockRegex 或文件格式。')
      console.log('使用的 Regex:', guideBlockRegex.toString())
      return
    }

    for (const match of matches) {
      const fullMatchString = match[0] // 整个匹配到的对象字符串
      const guideIdString = match[1] // 'game-level-XX'
      const levelId = match[2] // 'XX'
      const keywordOpeningQuote = match[3] // ' 或 " 或 `
      const oldKeywordsContent = match[4] // 旧的 keywords 字符串内容
      const matchStartIndex = match.index

      console.log(`\n[处理匹配块]: ${guideIdString} (文件索引: ${matchStartIndex})`)
      console.log(`  提取 Level ID: ${levelId}`)
      console.log(`  找到旧 Keywords 内容: ${oldKeywordsContent.replace(/\n/g, '\\n')}`)
      console.log(`  旧 Keywords 使用的引号: ${keywordOpeningQuote}`)

      if (!levelId) {
        console.warn(`  警告: 无法从 ${guideIdString} 提取有效的 Level ID，跳过此块。`)
        continue
      }

      // 构建新的 Keywords 字符串内容
      const newKeywordsContent = `Dreamy Room Level ${levelId}, pig themed bedroom walkthrough, Dreamy Room guide, puzzle game tips`
      console.log(`  预期新 Keywords 内容: ${newKeywordsContent}`)

      // 比较原始内容，看是否需要更新
      if (oldKeywordsContent.trim() !== newKeywordsContent.trim()) {
        console.log(`  检测到需要更新 Keywords。`)

        // 使用子正则表达式在完整匹配块 (fullMatchString) 中定位并替换 keywords 的内容
        // 这个子正则需要匹配 keywords: '...', 并替换 '...' 之间的内容
        const keywordsSubRegex = new RegExp(
          '(keywords:\\s*' +
            keywordOpeningQuote +
            ')' + // Group 1: "keywords: '" (或 " 或 `)
            '[\\s\\S]*?' + // Match old content non-greedily
            '(' +
            keywordOpeningQuote +
            ')', // Group 2: The closing quote
        )

        let successfullyReplacedInBlock = false
        const updatedFullMatchString = fullMatchString.replace(
          keywordsSubRegex,
          (subMatch, prefix, suffix) => {
            successfullyReplacedInBlock = true
            // 返回 prefix + 新内容 + suffix
            return prefix + newKeywordsContent + suffix
          },
        )

        if (successfullyReplacedInBlock) {
          // 存储更新信息
          updatesToApply.push({
            index: matchStartIndex,
            originalLength: fullMatchString.length,
            newBlockContent: updatedFullMatchString,
          })
          changesMade = true
          console.log(`  已准备更新 ${guideIdString} 的 keywords。`)
        } else {
          console.error(
            `  错误: 未能成功在 ${guideIdString} 的块内定位并替换 keywords 内容。正则: ${keywordsSubRegex.toString()}。未应用更改到此块。`,
          )
        }
      } else {
        console.log(`  Keywords 已是最新，无需更新。`)
      }
    } // End of loop through matches

    // --- 应用更新 ---
    if (changesMade) {
      console.log(`\n检测到 ${updatesToApply.length} 处更改，正在构建最终文件内容...`)
      updatesToApply.sort((a, b) => b.index - a.index) // 从后往前应用

      let finalContent = originalFileContent
      for (const update of updatesToApply) {
        finalContent =
          finalContent.substring(0, update.index) +
          update.newBlockContent +
          finalContent.substring(update.index + update.originalLength)
        console.log(`  已应用更新 @ 索引 ${update.index}`)
      }
      modifiedContent = finalContent

      console.log('正在写入文件...')
      await fs.writeFile(dataFilePath, modifiedContent, 'utf8')
      console.log('文件已成功更新！')
    } else {
      console.log('\n没有需要更新的内容，或者未找到有效匹配项进行更改。')
    }
  } catch (error) {
    console.error('\n执行脚本时发生严重错误:', error)
  }
}

updateKeywords()
