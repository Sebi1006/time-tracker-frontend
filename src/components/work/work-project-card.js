import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField
} from '@mui/material';
import { projects } from '../../__mocks__/projects';
import { tags } from '../../__mocks__/tags';
import { useEffect, useState } from 'react';
import { getProjects, getTags } from '../../utils/config';

export const WorkProjectCard = (props) => {
  const [values, setValues] = useState({
    project: '',
    workingHours: '',
    tag: '',
    description: '',
    disabled: false
  });

  const [project, setProject] = useState([]);
  const [tag, setTag] = useState([]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = () => {
    props.addWorkPackage({
      project: values.project,
      workingHours: Number(values.workingHours),
      tag: values.tag,
      description: values.description
    });

    setValues({
      ...values,
      disabled: true
    });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
      setProject(projects);
      setTag(tags);
    } else {
      getProjects().then(response => setProject(response));
      getTags().then(response => setTag(response));
    }
  }, []);

  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Card style={{ backgroundColor: '#F8F8F8' }}>
        <CardContent>
          <TextField
            fullWidth
            label="Project"
            name="project"
            select
            value={values.project}
            onChange={handleChange}
            margin={'dense'}
            disabled={values.disabled}
          >
            {project.map((current) => (
              <MenuItem key={current.id} value={current.title}>
                {current.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Working Hours"
            name="workingHours"
            type="number"
            value={values.workingHours}
            onChange={handleChange}
            margin={'dense'}
            disabled={values.disabled}
          />
          <TextField
            fullWidth
            label="Tag"
            name="tag"
            select
            value={values.tag}
            onChange={handleChange}
            margin={'dense'}
            disabled={values.disabled}
          >
            {tag.map((current) => (
              <MenuItem key={current.id} value={current.name}>
                {current.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            margin={'dense'}
            disabled={values.disabled}
          />
          <Box textAlign="right" sx={{ marginTop: 2 }}>
            <Button
              variant="outlined"
              disabled={values.project === ''
              || values.workingHours === ''
              || values.tag === ''
              || values.disabled}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
