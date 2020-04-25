---
id: deployment
title: Deployment
sidebar_label: Models Deployment
---

Deploying a application is relatively easy.

There are several ways to do it depending on your specific use case and the tools that you use.

You will see more about some of the ways to do it in the next sections.

## Versions

The API is already being used in production in a few applications and systems. But its development is still moving quickly.

New features are added frequently, bugs are fixed regularly, and the code is still continuously improving.

That's why the current versions are still 0.x.x, this reflects that each version could potentially have breaking changes. This follows [the Semantic Versioning conventions](https://semver.org/).

You can create production applications with this API implementation right now (and you have probably been doing it for some time), you just have to make sure that you use a version that works correctly with the rest of your code.

## Requirements

Python 3.6+

## Installation

In the root project execute the following command to install all dependencies project

```
pip install -r requirements.txt
```

You will also need an ASGI server, for production such as <a href="http://www.uvicorn.org" class="external-link" target="_blank">Uvicorn</a> or <a href="https://gitlab.com/pgjones/hypercorn" class="external-link" target="_blank">Hypercorn</a>.

```bash
pip install uvicorn
```

## Configuration
### Configuration Files
All of the configuration files for the API  are stored in the `config` directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

### Application Key
The next thing you should do after installing is set your application key to a random string.

Typically, this string should be 32 characters long. The key can be set in the `.env` environment file. If you have not copied the `.env.example` file to a new file named `.env`, you should do that now. If the application key is not set, your user sessions and other encrypted data will not be secure!

### Model Configuration
The model that we are going to deploy is for predicting photovoltaic fault. You can get the data [here](https://github.com/RentadroneCL/model-definition).

We start by loading the data and compiled models into the `storage/model` folder and the configuration files for each model in the `storage/config` folder and saving the names of the features that we want to use in our model.

### Example model configuration file
```js
{
  "model": {
    "min_input_size": 400,
    "max_input_size": 400,
    "anchors": [5,7, 10,14, 15, 15, 26,32, 45,119, 54,18, 94,59, 109,183, 200,21],
    "labels": ["1"],
    "backend": "full_yolo_backend.h5"
  }
}
```

After we have prepared the data and saved all necessary files it is time to start creating the API to serve our model from.

**NOTE:** There are several methods for saving a model, each with its own sets of pros and cons you may change in function of your necesities.

### Run it

Run the server with:

```bash
uvicorn run:app --reload
```

<details markdown="1">
<summary>About the command <code>uvicorn run:app --reload</code>...</summary>

The command `uvicorn run:app` refers to:

* `run`: the file `run.py` (the Python "module").
* `app`: the object imported inside of `run.py` with the line `from app import app`.
* `--reload`: make the server restart after code changes. Only do this for development.

</details>

You already created an API that:

* Receives HTTP requests in the _path_ `/prediction`.
* `/prediction` _path_ take `POST` <em>operations</em> (also known as HTTP _methods_).
* The _path_ parameter should be parse as `json` object.
* If the mimetype does not indicate JSON `application/json` this returns `None`.

### Example of an input data
```js
[
  {
    "id": 3,
    "url": "https://domain.com/storage/3/0074.jpg"
  },
  {
    "id": 6,
    "url": "https://domain.com/storage/6/0045.jpg"
  },
  {
    "id": 7,
    "url": "https://domain.com/storage/7/0055.jpg"
  },
  {
    "id": 8,
    "url": "https://domain.com/storage/8/0024.jpg"
  },
  {
    "id": 2,
    "url": "https://domain.com/storage/2/0078.jpg"
  },
  {
    "id": 5,
    "url": "https://domain.com/storage/5/0091.jpg"
  },
  {
    "id": 4,
    "url": "https://domain.com/storage/4/0089.jpg"
  }
]
```

### Example of output prediction
```js
[
  {
    "id": 3,
    "url": "https://domain.com/storage/3/0074.jpg",
    "objects": []
  },
  {
    "id": 6,
    "url": "https://domain.com/storage/6/0045.jpg",
    "objects": [
      {
        "class": "1",
        "label": "Soiling Fault",
        "score": -1,
        "xmax": 98,
        "xmin": 86,
        "ymax": 100,
        "ymin": 100
      },
      {
        "class": "1",
        "label": "Soiling Fault",
        "score": -1,
        "xmax": 256,
        "xmin": 243,
        "ymax": 104,
        "ymin": 104
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 14,
        "xmin": 0,
        "ymax": 49,
        "ymin": 49
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 231,
        "xmin": 218,
        "ymax": 56,
        "ymin": 56
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 231,
        "xmin": 218,
        "ymax": 59,
        "ymin": 59
      }
    ]
  },
  {
    "id": 7,
    "url": "https://domain.com/storage/7/0055.jpg",
    "objects": []
  },
  {
    "id": 8,
    "url": "https://domain.com/storage/8/0024.jpg",
    "objects": []
  },
  {
    "id": 2,
    "url": "https://domain.com/storage/2/0078.jpg",
    "objects": [
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 364,
        "xmin": 347,
        "ymax": 329,
        "ymin": 329
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 367,
        "xmin": 343,
        "ymax": 329,
        "ymin": 329
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 366,
        "xmin": 350,
        "ymax": 329,
        "ymin": 329
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 369,
        "xmin": 347,
        "ymax": 329,
        "ymin": 329
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 361,
        "xmin": 347,
        "ymax": 334,
        "ymin": 334
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 366,
        "xmin": 349,
        "ymax": 333,
        "ymin": 333
      },
      {
        "class": "4",
        "score": -1,
        "label": "Diode Fault",
        "xmax": 367,
        "xmin": 349,
        "ymax": 331,
        "ymin": 331
      }
    ]
  },
  {
    "id": 5,
    "url": "https://domain.com/storage/5/0091.jpg",
    "objects": []
  },
  {
    "id": 4,
    "url": "https://domain.com/storage/4/0089.jpg",
    "objects": []
  }
]
```
