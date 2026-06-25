import PageContent from '../models/PageContent.js';

export const getContentByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const content = await PageContent.find({ page });
    
    
    
    const contentMap = content.reduce((acc, curr) => {
      acc[curr.section] = curr;
      return acc;
    }, {});
    
    res.json(contentMap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upsertContent = async (req, res) => {
  try {
    const { page, section, contentHtml } = req.body;
    
    
    const updatedContent = await PageContent.findOneAndUpdate(
      { page, section },
      { contentHtml },
      { new: true, upsert: true }
    );
    
    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
